// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/// @author: SWMS.de

import "@manifoldxyz/creator-core-solidity/contracts/core/IERC721CreatorCore.sol";
import "@manifoldxyz/libraries-solidity/contracts/access/AdminControl.sol";
import "@manifoldxyz/creator-core-solidity/contracts/extensions/ICreatorExtensionTokenURI.sol";

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./libraries/Base64.sol";


contract ExtensionMint is AdminControl,ICreatorExtensionTokenURI,ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address private _creator;
    uint256 private _tokenId;
    uint256 public constant PRICE = 0.01 ether;
    address[] internal nftHolders;

     struct NFTAttributes {
        string name;
        string imageURI;
        string description;
        string attributes;
    }
    mapping(uint256 => NFTAttributes) public nftHolderAttributes;

    constructor(string memory name, string memory symbol, address creator) ERC721(name,symbol){
        _creator = creator;
    }


    function supportsInterface(bytes4 interfaceId) public view virtual override(AdminControl, IERC165,ERC721) returns (bool) {
        return interfaceId == type(ICreatorExtensionTokenURI).interfaceId 
        || AdminControl.supportsInterface(interfaceId) 
        || super.supportsInterface(interfaceId);
    }

    function mint(uint16 _count,string memory image,string memory name, string memory description, string memory attributes)
        public
        payable
    {
        require(
            msg.value >= PRICE * _count,
            "Not enough ether to purchase NFTs."
        );
        require(
            _count > 0
        );
        
        for (uint256 i = 0; i < _count; i++) {
            _mintSingleNFT(image, name, description,attributes);
        }
    }
    function tokenURI(uint256 _tokenId)
        public
        view
        override
        returns (string memory)
    {
        string memory json = Base64.encode(
            bytes(
                string(
                     abi.encodePacked(
                        '{"name": "',
                        nftHolderAttributes[_tokenId].name,
                        '", "description": "',
                        nftHolderAttributes[_tokenId].description,
                        '", "image": "',
                        nftHolderAttributes[_tokenId].imageURI,
                        '", "attributes": "',
                        nftHolderAttributes[_tokenId].attributes,
                        '"}'
                    )
                )
            )
        );

        string memory output = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        return output;
    }

    function tokenURI(address creator,uint256 _tokenId)
        public
        view
        override
        returns (string memory)
    {
        //require(creator == _creator && tokenId == _tokenId, "Invalid token");
        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "',
                        nftHolderAttributes[_tokenId].name,
                        '", "description": "',
                        nftHolderAttributes[_tokenId].description,
                        '", "image": "',
                        nftHolderAttributes[_tokenId].imageURI,
                        '", "attributes": "',
                        nftHolderAttributes[_tokenId].attributes,
                        '"}'
                    )
                )
            )
        );

        string memory output = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        return output;
    }

    function _mintSingleNFT(string memory image,
        string memory name,
        string memory description,
        string memory attributes
        ) private {
        uint256 newItemId = _tokenIds.current();
         nftHolderAttributes[newItemId] = NFTAttributes({
            name: name,
            imageURI: image,
            description: description,
            attributes: attributes
        });
        IERC721CreatorCore(_creator).mintExtension(msg.sender);
        _tokenIds.increment();
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function withdraw() public payable adminRequired {
        require(address(this).balance > 0);
        payable(owner()).transfer(address(this).balance);
    }
}
