require('dotenv').config();

// Settings please adjust
const tokenName = "TestToken"; // Token name
const tokenDescription = "This is a nice token"; // Token Description
const PUBLIC_KEY = "0xee8E9221497f30F44164B8d6fF7ad0347aF16F69";  // Wallet Address sender
const PRIVATE_KEY = process.env.PRIVATE_KEY; //Private Walled Key
const contractAddress = "0x630840643A3CC59F0DAB675dd94C5eff5B9677b7"; // Contract Address
const tokenURI = "https://arweave.net/nc_yCW7wThLQL_VtJ1Sn_IRkM3LS7JmG2iiAwc_XsOs"; // Image!
const API_URL = process.env.STAGING_ALCHEMY_KEY; // Alchemy API Url


const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/ExtensionMint.sol/ExtensionMint.json");

const nftContract = new web3.eth.Contract(contract.abi, contractAddress);


async function mintNFT() {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce
  console.log("initialize");


  HTMLFormControlsCollection.log(test)
  console.log("MInting");


  gasPrice = web3.eth.getGasPrice(function (error, gasPrice) {
    web3.eth.estimateGas({
      to: contractAddress,
      nonce: nonce,

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
        'data': nftContract.methods.mint().encodeABI()
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
          console.log(" Promise failed:", err)
        })
    });





  });





}
mintNFT().then(data => {

});


