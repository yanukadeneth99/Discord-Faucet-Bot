// Reply beep with boop

const wait = require("timers/promises").setTimeout;

module.exports = async (interaction) => {
  await interaction.reply("🙈 Boop!");

  await wait(10000);
  await interaction.followUp({
    content: "You saw the boop right? 🙊",
    ephemeral: true,
  });
};
