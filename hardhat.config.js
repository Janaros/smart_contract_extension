require('@nomiclabs/hardhat-waffle');
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config();
module.exports = {
  solidity: '0.8.0',
  settings: { 
    "optimizer": {
      "enabled": true,
      "runs": 300
    },
  },
  "outputSelection": {
    "*": {
      "*": [
        "evm.bytecode",
        "evm.deployedBytecode",
        "devdoc",
        "userdoc",
        "metadata",
        "abi"
      ]
    }
  },
  "libraries": {},
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_TOKEN // Etherscan API Key for verification
  },
  polyscan: {
    apiKey: process.env.POLYSCAN_API_TOKEN
  },
  networks: {
    rinkeby: {
      url: process.env.STAGING_ALCHEMY_KEY,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};