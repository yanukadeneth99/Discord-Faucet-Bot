// Returns the balance of the contract
const ethers = require("ethers");
const getProvider = require("../utils/getProvider");
const { stats } = require("../config.json");

module.exports = async (interaction) => {
  await interaction.reply({ content: "Finding....", fetchReply: true });

  // Get the Network from user input and the relevant provider
  const networkName = interaction.options.getString("network");
  // const token = interaction.options.getString("token");
  const provider = getProvider(networkName);

  let balance;

  try {
    // Get the balance of the network core currency
    balance = await ethers.utils.formatEther(
      await provider.getBalance(stats.walletAddress)
    );
  } catch (error) {
    console.error(error);
    await interaction.editReply({
      content: "Error Getting balance",
      ephemeral: true,
    });
  }

  // Rounding off the value
  const balanceShort = balance
    .toString()
    .slice(0, balance.toString().indexOf(".") + 3);

  // Printing the value out
  await interaction.editReply({
    content: `${networkName.toUpperCase()} Balance : ${balanceShort} ETH`,
    ephemeral: true,
  });
};
