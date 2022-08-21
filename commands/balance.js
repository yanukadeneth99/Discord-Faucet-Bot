// Get the balance of the Address only for admins

const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { networks } = require("../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("balance")
    .setDescription("Get the balance remaining of the contract")
    .setDMPermission(true)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption((option) =>
      option
        .setName("network")
        .setDescription("Select the network to view balance")
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
