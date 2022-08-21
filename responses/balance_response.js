// Returns the balance of the contract
const ethers = require("ethers");
require("dotenv").config({ path: "../.env" });

module.exports = async (interaction) => {
  await interaction.reply({ content: "Finding....", fetchReply: true });

  // Get the Network from user input and the relevant provider
  const network = interaction.options.getString("network");
  const token = interaction.options.getString("token");
  const provider = getProvider(network);

  let balance;

  try {
    // Get the balance of the network core currency
    balance = await ethers.utils.formatEther(
      await provider.getBalance(process.env.WALLET_ADDRESS)
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
    content: `Current Balance : ${balanceShort} ETH`,
    ephemeral: true,
  });
};

function getProvider(network) {
  switch (network) {
    case "goerli":
      return new ethers.providers.JsonRpcProvider(
        process.env.INFURA_GOERLI_URL ?? process.env.ALCHEMY_GOERLI_URL
      );
  }
}
