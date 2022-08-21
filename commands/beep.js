// Respond user beep with Boop

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("beep")
    .setDescription("Replies with boop!")
    .setDMPermission(true),
};
