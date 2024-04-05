require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config({
  path: "./.env"
});

const ALCHEMY_URL = process.env.REACT_APP_ALCHEMY_HTTPS_URL;
const ACCOUNT_PVT_KEY = process.env.REACT_APP_HARDHAT_ACC_PVT_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: `${ALCHEMY_URL}`,
      accounts: [`${ACCOUNT_PVT_KEY}`]
    }
  }
};
