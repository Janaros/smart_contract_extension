# Manifold Solidity Extension

This smart contract extends the Manifold contract. So you can extend it with features like lazy minting or splitting.
Using free alchemy API: https://alchemy.com/?r=2b92f94f5cd00a17

### Installation

1. Clone this repo and run npm install
2. Create  a .env file in the root directory and set up your constants:
    ETHERSCAN_API_TOKEN=EtherscanAPIToken 
    POLYSCAN_API_TOKEN=PolyscanAPIToken
    STAGING_ALCHEMY_KEY=Your alchemy URI
    PRIVATE_KEY=Your private Wallet Key
3. run npm install
4. get free alchemy API url under https://alchemy.com/?r=2b92f94f5cd00a17
 
### Deploy on Rinkeby Testnet

1. Setup scripts/deployExtension.js
   set mainContract to your Manifold Contract, change name and symbol
2. run: npx hardhat run scripts/deployExtension.js --network rinkeby
3. Verify your code on the Testnet 
    npx hardhat verify  --network rinkeby "NEW_CONTRACT_ADDRESS" MANIFOLD_CONTRACT_ADDRESS --show-stack-traces 
4. If everything worked, you can view your contract at        https://rinkeby.etherscan.io/address/[NEWCONTRACT]#code

### register your extension to the manifold contract

1. call your contract on etherscan
2. go to the tab write as proxy
3. connect to your wallet
4. open registerExtension and enter your contract address and the URL of the contract on Etherscan
5. click write 


### Mint a token (Example)

1. Setup scripts/interactExtension.js
2. Setup your constants in lines 11 to 20
3. npx run scripts/interact.js
 
