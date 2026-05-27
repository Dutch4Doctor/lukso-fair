require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: { enabled: true, runs: 200 }
    }
  },
  networks: {
    luksoTestnet: {
      url: "https://rpc.testnet.lukso.network",
      chainId: 4201,
      accounts: [process.env.PRIVATE_KEY],
    },
    luksoMainnet: {
      url: "https://rpc.mainnet.lukso.network",
      chainId: 42,
      accounts: [process.env.PRIVATE_KEY],
    }
  }
};
