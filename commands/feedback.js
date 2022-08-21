// Generate a Modal where you can enter your required eth
// Address, Token(LINK, ETH, MATIC), Network(Mumbai,Rinkeby)

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("feedback")
    .setDescription("Send Feedback to the Faucet Bot")
    .setDMPermission(true),
};
