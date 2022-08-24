// Returns a transaction object which can be used to transfer to the passed address
// Pass the token Name and Network Name if the transaction is meant to be using a ERC20 token

const ethers = require("ethers");
const { stats, secrets, tokens } = require("../config.json");
const erc20ABI = require("../libs/erc20.json");

module.exports = async (provider, usrAddress, networkName, tokenName) => {
  // Create a wallet instance
  const wallet = new ethers.Wallet(secrets.walletPrivateKey, provider);

  //* Native Transfer
  if (!tokenName) {
    const nonce = await provider.getTransactionCount(stats.walletAddress); // Get the latest nonce
    let txObj; // Holds the Transation Object

    if (networkName == "mumbai") {
      //* Polygon Network
      txObj = {
        to: usrAddress,
        nonce,
        value: ethers.utils.parseEther(stats.dailyEth.toString()),
        type: 2,
        maxFeePerGas: stats.maxFee,
        maxPriorityFeePerGas: stats.maxFee,
        gasLimit: "21000",
      };
    } else {
      //* Non-Polygon Networks
      txObj = {
        to: usrAddress,
        nonce,
        value: ethers.utils.parseEther(stats.dailyEth.toString()),
        type: 2,
      };
    }

    // Transaction (Call await on the receiving end)
    return await wallet.sendTransaction(txObj);
  }
  //* Token Transfer (ERC20)
  else {
    // Create contract and get decimals
    const contract = new ethers.Contract(
      tokens[tokenName][networkName],
      erc20ABI,
      wallet
    );
    const decimals = await contract.decimals();

    // Create Transaction object
    return await contract.transfer(
      usrAddress,
      ethers.utils.parseEther(tokens[tokenName].amount.toString(), decimals)
    );
  }
};
