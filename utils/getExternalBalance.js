const ethers = require("ethers");
const erc20ABI = require("../libs/erc20.json");
const { tokens, stats } = require("../config.json");

module.exports = async (provider, tokenName, networkName) => {
  try {
    const address = tokens[tokenName][networkName];
    if (!address) throw Error("Token Address not found!");

    const contract = new ethers.Contract(address, erc20ABI, provider);
    return (await contract.balanceOf(stats.walletAddress)).toString();
  } catch (error) {
    console.error(
      `Error getting external balance in getExternalBalance: ${error}`
    );
    throw new Error(error);
  }
};
