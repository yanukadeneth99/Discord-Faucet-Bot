// Handles Faucet Transfers
const ethers = require("ethers");
const getProvider = require("../utils/getProvider");
const getExternalBalance = require("../utils/getExternalBalance");
const alchemy = require("../utils/alchemy");
const { stats, networks } = require("../config.json");

// TODO : Handle the errors and implement validation
// TODO : Handle when passed token

module.exports = async (interaction) => {
  await interaction.reply({ content: "🤖 Mining....", fetchReply: true });
  // Get the Network,token and address from user input
  const usrAddress = interaction.options.getString("address");
  const networkName = interaction.options.getString("network");
  const tokenName =
    interaction.options.getString("token") ??
    networks[networkName].nativeCurrency;

  // Get the Provider based on the network
  const provider = getProvider(networkName);

  // Create a wallet instance
  const wallet = new ethers.Wallet(stats.walletPrivateKey, provider);

  const tx = {
    to: "0x5D8f50B286911F37CE077c40EF10A76E7a6f0B39",
    value: ethers.utils.parseEther("1.0"),
  };

  try {
    const tx2 = await wallet.sendTransaction(tx);
    await tx2.wait();
    await interaction.editReply("💁 Transfer Successful, Happy Coding!");
  } catch (error) {
    await interaction.editReply("🤒 Error while transfer!");
  }
};
