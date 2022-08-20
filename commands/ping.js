// Respond the user with the bot's ping

const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Check the ping of the bot (for admins only)"),
};
