// Users can request for currency
//TODO : Apply Rate Limiting
//TODO : Make sure only verified members can do this (or any other role)

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("faucet")
    .setDescription("Claim free eth for your work")
    .setDMPermission(false)
    .addStringOption((option) =>
      option
        .setName("address")
        .setDescription("Type your wallet address")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("network")
        .setDescription("Select the network")
        .setRequired(true)
        .addChoices(
          {
            name: "Goerli",
            value: "goerli",
          },
          {
            name: "Rinkeby",
            value: "rinkeby",
          },
          {
            name: "Mumbai",
            value: "mumbai",
          }
        )
    )
    .addStringOption((option) =>
      option
        .setName("token")
        .setDescription("External ERC20 tokens if applicable")
        .setRequired(false)
        .addChoices({
          name: "LINK",
          value: "link",
        })
    ),
};
