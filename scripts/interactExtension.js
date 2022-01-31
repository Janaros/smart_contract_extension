require('dotenv').config();
/**
 * @author: swms.de
 * This File ist just a Demo.
 * please use https://github.com/Janaros/web3-react-template
 * 
 * 
 * 
 */
// Settings please adjust
const PUBLIC_KEY = "0xee8E9221497f30F44164B8d6fF7ad0347aF16F69";  // Wallet Address sender
const PRIVATE_KEY = process.env.PRIVATE_KEY; //Private Walled Key
const contractAddress = "0xb99D99bD625AB129507c739Fb73c19cd034753D4"; // Contract Address

const API_URL = process.env.STAGING_ALCHEMY_KEY; // Alchemy API Url
const count = 1;
const image = "https://arweave.net/nc_yCW7wThLQL_VtJ1Sn_IRkM3LS7JmG2iiAwc_XsOs"; // Image!
const name = "Token 1";
const description = "Token 1 description";
const attributes = "[{-}]";


const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/ExtensionMint.sol/ExtensionMint.json");

const nftContract = new web3.eth.Contract(contract.abi, contractAddress);


async function mintNFT() {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce
  console.log("Minting");
  gasPrice = web3.eth.getGasPrice(function (error, gasPrice) {
    web3.eth.estimateGas({
      to: contractAddress,
      from: PUBLIC_KEY,
      value: 10000000000000000,
      data: nftContract.methods.mint(count,image, name, description,attributes).encodeABI()

    }).then((estimatedGas) => {
      console.log("---------------------------------------------------------------------");
      console.log("Minting");
      console.log("Calculated GasPrice", gasPrice);
      console.log("Calculated estimatedGas", estimatedGas);

      const tx = {
        'from': PUBLIC_KEY,
        'to': contractAddress,
        'nonce': nonce,
        'gasPrice': gasPrice,
        'gas': estimatedGas,
        'value': 10000000000000000,
        'data': nftContract.methods.mint(count,image, name, description,attributes).encodeABI()
      };
      const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
      signPromise
        .then((signedTx) => {
          web3.eth.sendSignedTransaction(
            signedTx.rawTransaction,
            function (err, hash) {
              if (!err) {
                console.log(
                  "The hash of your transaction is: ",
                  hash,
                  "\nCheck Alchemy's Mempool to view the status of your transaction!"
                )
                console.log("Minted....");
              } else {
                console.log(
                  "Something went wrong when submitting your transaction:",
                  err.message
                )
              }
            }
          )
        })
        .catch((err) => {
          console.log(" Promise sendSignedTransaction failed:", err)
        })
    }).catch(err  => {
      console.log(" Promise getGasPrice failed:", err)
    });
  });





}
mintNFT().then(data => {

});


