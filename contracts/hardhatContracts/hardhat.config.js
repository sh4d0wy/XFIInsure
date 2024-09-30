require("@nomiclabs/hardhat-ethers");
require("dotenv").config();
require("@nomicfoundation/hardhat-verify");
require("hardhat-contract-sizer");

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 1337,
    },
    crossfi: {
      url: "https://rpc.testnet.ms",
      chainId: 4157,
      accounts: [process.env.PRIVATE_KEY],
    },
    polygon:{
      url:"https://rpc-amoy.polygon.technology/",
      chainId:80002,
      accounts: [process.env.PRIVATE_KEY],
    },
    sepolia:{
      url:"https://ethereum-sepolia-rpc.publicnode.com",
      chainId:11155111,
      accounts:[process.env.PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey:{
      polygonAmoy:"PW6NJB99A3Q432M6T68EEXZ48N8NPQPF5T",
      sepolia:"I2AMXWHXDKBJ895V9UC2VIX3C64M1ZQ92U"
    },
    customChains: [
      {
        network: "polygonAmoy",
        chainId: 80002,
        urls: {
          apiURL: "https://api-amoy.polygonscan.com/api",
          browserURL: "https://amoy.polygonscan.com/"
        }
      },
      {
        network:"sepolia",
        chainId:115511,
        urls:{
          apiUrl:"https://api-sepolia.etherscan.io/api",
          browserURL:"https://sepolia.etherscan.io/"
        }
      }
    ],
  },
  solidity: {
    version: "0.8.26",
    settings: {
      optimizer: {
        enabled: true,
        runs: 500,
      },
    },
    contractSizer: {
      alphaSort: true,
      runOnCompile: true,
      disambiguatePaths: false,
    },
  },
};
