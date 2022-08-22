// Returns the balance of the Faucet Account in native Currency or the token passed
const getProvider = require("../utils/getProvider");
const getBalance = require("../utils/getBalance");
const { networks, channels } = require("../config.json");

module.exports = async (interaction) => {
  // Initial Responce to client
  await interaction.deferReply();
  await interaction.editReply("👩‍💻 Calculating....");

  try {
    let balance; // Holds the final balance (string)

    // Get the Network and token from user input
    const networkName = interaction.options.getString("network");
    const tokenName =
      interaction.options.getString("token") ??
      networks[networkName].nativeCurrency;

    // Get the Provider based on the network
    const provider = getProvider(networkName);

    if (networks[networkName].nativeCurrency == tokenName) {
      //* Token not passed or native Currency (No ERC20 tokens)
      balance = await getBalance(provider);
    } else {
      //* Non native token (ERC 20 token)
      balance = await getBalance(provider, tokenName, networkName);
    }

    // Rounding off the value
    const balancefinal = balance
      .toString()
      .slice(0, balance.toString().indexOf(".") + 3);

    // Printing the value out
    await interaction.editReply(
      `[${networkName.toUpperCase()}] [${balancefinal}] [${tokenName.toUpperCase()}]`
    );

    // Log out the transaction
    const logchannel = await interaction.client.channels.cache.get(
      channels.log
    );
    logchannel.send(
      `[BALANCE]\n${new Date(
        Date.now()
      ).toUTCString()}\nNetwork : ${networkName.toUpperCase()}\nToken : ${tokenName.toUpperCase()}\nBy : ${
        interaction.user.username
      }`
    );
  } catch (error) {
    console.error(`Error [RESPONCE - BALANCE] : ${error}`);
    const logchannel = await interaction.client.channels.cache.get(
      channels.log
    );
    logchannel.send(
      `[ERROR]\n${new Date(
        Date.now()
      ).toUTCString()}\nGetting Balance\n${error}`
    );
    await interaction.editReply("🙇‍♂️ Error, please try again later");
  }
};
