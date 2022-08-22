// Returns a transaction object which can be used to transfer to the passed address
// Pass the token Name and Network Name if the transaction is meant to be using a ERC20 token

// TODO : Handle nounce and gas fees

const ethers = require("ethers");
const { stats, tokens, channels } = require("../config.json");
const erc20ABI = require("../libs/erc20.json");

module.exports = async (
  interaction,
  provider,
  usrAddress,
  tokenName,
  networkName
) => {
  try {
    // Create a wallet instance
    const wallet = new ethers.Wallet(stats.walletPrivateKey, provider);

    //* Native Transfer
    if (!tokenName && !networkName) {
      // Create Transaction Object
      const txObj = {
        to: usrAddress,
        value: ethers.utils.parseEther(stats.dailyEth.toString()),
      };

      // Transaction
      return wallet.sendTransaction(txObj);
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
      return contract.transfer(
        usrAddress,
        ethers.utils.parseEther(stats.dailyEth.toString(), decimals)
      );
    }
  } catch (error) {
    console.error(`Error creating Transaction : ${error}`);
    const logchannel = await interaction.client.channels.cache.get(
      channels.log
    );
    logchannel.send(
      `[ERROR]\n${new Date(
        Date.now()
      ).toUTCString()}\nCreating Transaction\n${error}`
    );
  }
};
