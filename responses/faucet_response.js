// Handles Faucet Transfers
const ethers = require("ethers");
const getProvider = require("../utils/getProvider");
const getExternalBalance = require("../utils/getExternalBalance");
const getBalance = require("../utils/getBalance");
const erc20ABI = require("../libs/erc20.json");
const { stats, networks, tokens } = require("../config.json");

// TODO : Handle the errors and implement validation
// TODO : Handle when passed token

module.exports = async (interaction) => {
  try {
    await interaction.reply({ content: "🤖 Mining....", fetchReply: true });
    // Get the Network,token and address from user input
    const usrAddress = interaction.options.getString("address");
    const networkName = interaction.options.getString("network");
    const tokenName =
      interaction.options.getString("token") ??
      networks[networkName].nativeCurrency;

    // Check whether address is valid
    if (!ethers.utils.isAddress(usrAddress)) {
      await interaction.editReply("😤 Please enter a correct address");
      return;
    }

    // Get the Provider based on the network
    const provider = getProvider(networkName);

    // Native Transfer (No Token or Native Currency)
    if (tokenName == networks[networkName].nativeCurrency) {
      // If the balance is too low (curBalance is in a float)
      const curBalance = await getBalance(provider);
      if (curBalance < stats.dailyEth) {
        await interaction.editReply(
          `😥 Insufficient funds, please donate to : ${stats.walletAddress}`
        );
        return;
      }

      // Create a wallet instance
      const wallet = new ethers.Wallet(stats.walletPrivateKey, provider);

      const txObj = {
        to: usrAddress,
        value: ethers.utils.parseEther("1.0"),
      };

      // Transaction
      const tx = await wallet.sendTransaction(txObj);
      await tx.wait();
      await interaction.editReply(`💁 Transfer Successful, Happy Coding! 
        \nEtherscan Link: https://${networkName}.etherscan.io/tx/${tx.hash}`);
    }
    // Non Native Transfer (ERC-20)
    else {
      // If the balance is too low (curBalance is in a float)
      const curBalance = await getExternalBalance(
        provider,
        tokenName,
        networkName
      );
      if (curBalance < stats.dailyEth) {
        await interaction.editReply(
          `😥 Insufficient funds, please donate ${tokenName.toUpperCase()} to : ${
            stats.walletAddress
          }`
        );
        return;
      }

      // Create a wallet instance
      const wallet = new ethers.Wallet(stats.walletPrivateKey, provider);

      // Create contract
      const contract = new ethers.Contract(
        tokens[tokenName][networkName],
        erc20ABI,
        wallet
      );
      const decimals = await contract.decimals();
      const tx = await contract.transfer(
        usrAddress,
        ethers.utils.parseEther(stats.dailyEth.toString(), decimals)
      );
      await tx.wait();
      await interaction.editReply("💁 Transfer Successful, Happy Coding!");
    }
  } catch (error) {
    console.error(`Error [RESPONCE - FAUCET] : ${error}`);
    await interaction.editReply("🙇‍♂️ Error, please try again later");
    // throw new Error(error);
  }
};
