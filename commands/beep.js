// Respond user beep with Boop

const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("beep")
    .setDescription("Replies with boop!"),
};
