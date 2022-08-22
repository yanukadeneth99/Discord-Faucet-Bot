// Transfers the set dailyEth value to the requested user.
// Rate limited to daily
const ethers = require("ethers");
const getProvider = require("../utils/getProvider");
const getBalance = require("../utils/getBalance");
const transfer = require("../utils/transfer");
const { stats, networks, channels } = require("../config.json");

// TODO : Apply Rate Limiting
// TODO : Make sure only verified members can do this (or any other role)

module.exports = async (interaction) => {
  // Initial Responce to client
  await interaction.deferReply();
  await interaction.editReply("🤖 Mining....");
  try {
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

    //* Native Transfer (No Token)
    if (tokenName == networks[networkName].nativeCurrency) {
      // If the balance is too low (curBalance is string)
      const curBalance = await getBalance(provider);
      if (parseFloat(curBalance) < stats.dailyEth) {
        await interaction.editReply(
          `😥 Insufficient funds, please donate to : ${stats.walletAddress}`
        );
        return;
      }

      // Transaction
      const tx = await transfer(provider, usrAddress);
      await tx.wait();
    }
    //* Non Native Transfer (ERC-20)
    else {
      // If the balance is too low (curBalance is in a float)
      const curBalance = await getBalance(provider, tokenName, networkName);
      if (curBalance < stats.dailyEth) {
        await interaction.editReply(
          `😥 Insufficient funds, please donate ${tokenName.toUpperCase()} to : ${
            stats.walletAddress
          }`
        );
        return;
      }

      // Transaction
      const tx = await transfer(provider, usrAddress, tokenName, networkName);
      await tx.wait();
    }

    // Transfer Success
    const logchannel = await interaction.client.channels.cache.get(
      channels.log
    );
    logchannel.send(
      `[TRANSFER]\n${new Date(
        Date.now()
      ).toUTCString()}\nNetwork : ${networkName.toUpperCase()}\nToken : ${tokenName.toUpperCase()}\nBy : ${
        interaction.user.username
      }\nTo : ${usrAddress}`
    );
    await interaction.editReply("💁 Transfer Successful, Happy Coding!");
  } catch (error) {
    console.error(`Error Transferring : ${error}`);
    const logchannel = await interaction.client.channels.cache.get(
      channels.log
    );
    logchannel.send(
      `[ERROR]\n${new Date(Date.now()).toUTCString()}\nTransferring\n${error}`
    );
    await interaction.editReply({
      content: "🙇‍♂️ Error, please try again later",
      ephemeral: true,
    });
  }
};
