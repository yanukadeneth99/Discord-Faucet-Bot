// Returns a string of the balance.
// If passed tokenName and networkName, then the interaction is considered as an ERC20, else it's considered native.

const { ethers } = require("ethers");
const erc20ABI = require("../libs/erc20.json");
const { stats, tokens } = require("../config.json");

module.exports = async (provider, tokenName, networkName) => {
  //* Token Balance (ERC20)
  if (tokenName && networkName) {
    const address = tokens[tokenName][networkName];
    if (!address) throw Error("Token Address not found!");

    const contract = new ethers.Contract(address, erc20ABI, provider);
    return (await contract.balanceOf(stats.walletAddress)).toString();
  }

  //* Native Balance
  return await ethers.utils.formatEther(
    await provider.getBalance(stats.walletAddress)
  );
};
