// Respond the user with the bot's ping

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Check the ping of the bot (for admins only)")
    .setDMPermission(true),
};
