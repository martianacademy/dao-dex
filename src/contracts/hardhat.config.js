require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("@openzeppelin/hardhat-upgrades");

/** @type import('hardhat/config').HardhatUserConfig */
require("dotenv").config();

const BSC_PRIVATE_KEY = process.env.BSC_PRIVATE_KEY;
const GANACHE_PRIVATE_KEY = process.env.GANACHE_PRIVATE_KEY;
const BSC_TESTNET_PRIVATE_KEY = process.env.BSC_TESTNET_PRIVATE_KEY;
const BSC_API_KEY = process.env.BSC_API_KEY;
const BSC_MAINNET_KEY = process.env.BSC_MAINNET_KEY;
module.exports = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://bscscan.com/
    apiKey: BSC_MAINNET_KEY,
  },

  defaultNetwork: "bscTestnet",
  // defaultNetwork: "hardhat",
  // defaultNetwork: "ganache",
  networks: {
    hardhat: {
      gas: "auto",
      gasPrice: 10000000000,
    },

    ganache: {
      url: "HTTP://127.0.0.1:7545",
      chainId: 1337,
      accounts: [BSC_PRIVATE_KEY],
      gas: "auto",
      gasPrice: 10000000000,
    },

    bsc: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      accounts: [BSC_PRIVATE_KEY],
      gas: "auto",
      gasPrice: 5000000000,
    },

    bscTestnet: {
      url: "https://data-seed-prebsc-2-s3.binance.org:8545",
      chainId: 97,
      accounts: [BSC_TESTNET_PRIVATE_KEY],
      gas: "auto",
      gasPrice: 10000000000,
    },
    polygon: {
      url: "https://rpc-mainnet.maticvigil.com",
      chainId: 137,
      accounts: [BSC_PRIVATE_KEY],
    },
    mumbai: {
      url: "https://matic-mumbai.chainstacklabs.com",
      chainId: 80001,
      accounts: [BSC_TESTNET_PRIVATE_KEY],
    },
  },
};
