require("dotenv").config()
require("@nomiclabs/hardhat-waffle");

// The next line is part of the sample project, you don't need it in your
// project. It imports a Hardhat task definition, that can be used for
// testing the frontend.
require("./tasks/faucet");

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      forking: {
        url: process.env.ALCHEMY_MAINNET_RPC_URL
      }
    },
    kovan: {
      url: process.env.KOVAN_RPC_URL,
      accounts: {
        mnemonic: process.env.MNEMONIC
      }
    }
  },
  solidity: "0.7.3"
};
