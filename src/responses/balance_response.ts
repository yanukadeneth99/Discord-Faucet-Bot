// Returns the balance of the Faucet Account in native Currency or the token passed
import getProvider from "../utils/getProvider";
import getBalance from "../utils/getBalance";
import { networks, channels } from "../config/config.json";

export default async (interaction) => {
  // Initial Responce to client
  await interaction.reply({ content: "👩‍💻 Calculating....", fetchReply: true });

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
  } catch (error) {
    console.error(`Error [RESPONCE - BALANCE] : ${error}`);
    const errorchannel = await interaction.client.channels.cache.get(
      channels.error
    );
    errorchannel.send(
      `[ERROR]\n${new Date(
        Date.now()
      ).toUTCString()}\nGetting Balance\n${error}`
    );
    await interaction.editReply("🙇‍♂️ Error, please try again later");
  }
};
