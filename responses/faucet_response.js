// Handles Faucet Transfers
const ethers = require("ethers");
const getProvider = require("../utils/getProvider");
const getExternalBalance = require("../utils/getExternalBalance");
const { stats, networks } = require("../config.json");

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

  //! Transfer the amount here

  await interaction.editReply("Function done");
};
