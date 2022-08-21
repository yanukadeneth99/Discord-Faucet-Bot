// Get the balance of the Address only for admins

const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

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
        .addChoices({
          name: "Goerli",
          value: "goerli",
        })
    )
    .addStringOption((option) =>
      option
        .setName("token")
        .setDescription("Token Type to search")
        .setRequired(false)
        .addChoices({
          name: "ETH",
          value: "eth",
        })
    ),
};