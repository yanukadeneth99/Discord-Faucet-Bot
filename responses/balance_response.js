// Returns the balance of the contract
const ethers = require("ethers");
const getProvider = require("../utils/getProvider");
const getExternalBalance = require("../utils/getExternalBalance");
const { stats, networks } = require("../config.json");

module.exports = async (interaction) => {
  try {
    await interaction.reply({
      content: "👩‍💻 Calculating....",
      fetchReply: true,
    });

    let balance;

    // Get the Network and token from user input
    const networkName = interaction.options.getString("network");
    const tokenName =
      interaction.options.getString("token") ??
      networks[networkName].nativeCurrency;

    // Get the Provider based on the network
    const provider = getProvider(networkName);

    if (networks[networkName].nativeCurrency == tokenName) {
      // Token not passed or native Currency (No ERC20 tokens)
      try {
        // Get the balance of the network core currency
        balance = await ethers.utils.formatEther(
          await provider.getBalance(stats.walletAddress)
        );
      } catch (error) {
        console.error(error);
        await interaction.editReply({
          content: "🙉 Error Getting balance",
          ephemeral: true,
        });
      }
    } else {
      // Non native token (ERC 20 token)
      try {
        balance = await getExternalBalance(provider, tokenName, networkName);
      } catch (error) {
        console.error(error);
        await interaction.editReply({
          content: "🙉 Error Getting balance",
          ephemeral: true,
        });
      }
    }

    // Rounding off the value
    const balancefinal = balance
      .toString()
      .slice(0, balance.toString().indexOf(".") + 3);

    // Printing the value out
    await interaction.editReply({
      content: `[${networkName.toUpperCase()}] [${balancefinal}] [${tokenName.toUpperCase()}]`,
    });
  } catch (error) {
    console.error(`Error [RESPONCE - BALANCE] : ${error}`);
    await interaction.reply("🙇‍♂️ Error, please try again later");
    // throw new Error(error);
  }
};
