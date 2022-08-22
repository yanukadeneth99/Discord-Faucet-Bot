const { ethers } = require("ethers");
const { stats } = require("../config.json");

module.exports = async (provider) => {
  try {
    return await ethers.utils.formatEther(
      await provider.getBalance(stats.walletAddress)
    );
  } catch (error) {
    console.error(`Error getting balance in getBalance : ${error}`);
  }
};
