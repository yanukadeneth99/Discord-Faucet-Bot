// Returns a transaction object which can be used to transfer to the passed address
// Pass the token Name and Network Name if the transaction is meant to be using a ERC20 token

// TODO : Find issues with Polygon LINK Transfers

const ethers = require("ethers");
const { stats, tokens } = require("../config.json");
const erc20ABI = require("../libs/erc20.json");
// const axios = require("axios").default;

module.exports = async (provider, usrAddress, networkName, tokenName) => {
  // Create a wallet instance
  const wallet = new ethers.Wallet(stats.walletPrivateKey, provider);

  //* Native Transfer
  if (!tokenName) {
    const nonce = await provider.getTransactionCount(stats.walletAddress); // Get the latest nonce
    let txObj; // Holds the Transation Object

    if (networkName == "mumbai") {
      //* Polygon Network
      // const res = await axios.get("https://gasstation-mumbai.matic.today/v2");
      // const data = res.data;
      // console.log(data);

      txObj = {
        to: usrAddress,
        nonce,
        value: ethers.utils.parseEther(stats.dailyEth.toString()),
        type: 2,
        maxFeePerGas: 95000000000,
        maxPriorityFeePerGas: 95000000000,
        gasLimit: "21000",
      };
    } else {
      //* Non-Polygon Networks
      // const feeData = await provider.getFeeData(); // Get the Fee Data
      // console.log(feeData);
      txObj = {
        to: usrAddress,
        nonce,
        value: ethers.utils.parseEther(stats.dailyEth.toString()),
        type: 2,
        maxFeePerGas: 95000000000,
        maxPriorityFeePerGas: 95000000000,
        gasLimit: "21000",
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
      ethers.utils.parseEther(stats.dailyEth.toString(), decimals),
      {
        maxFeePerGas: 95000000000,
        maxPriorityFeePerGas: 95000000000,
      }
    );
  }
};
