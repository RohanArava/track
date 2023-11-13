require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config();

const SEPOLIA_URL = process.env.SEPOLIA_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
module.exports = {
  solidity: {
    version: "0.8.19", // any version you want
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      },
    },
  },
  networks: {
    sepolia: {
      url: SEPOLIA_URL,
      accounts: [PRIVATE_KEY],
    },
  },
};
//0x5FbDB2315678afecb367f032d93F642f64180aa3