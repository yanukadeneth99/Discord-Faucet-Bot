/* 
Users can pass feedback which will be printed in a feedback discord channel.
Rate limited
*/

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("feedback")
    .setDescription(
      "Send Feedback regarding the Faucet Bot. Your discord username will be recorded."
    )
    .setDMPermission(false),
};
