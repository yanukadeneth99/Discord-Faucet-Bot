// Reply beep with boop

const wait = require("timers/promises").setTimeout;

module.exports = async (interaction) => {
  try {
    await interaction.reply("🙈 Boop!");

    await wait(10000);
    await interaction.followUp({
      content: "You saw the boop right? 🙊",
      ephemeral: true,
    });
  } catch (error) {
    console.error(`Error [RESPONCE - BEEP] : ${error}`);
    await interaction.reply("🙇‍♂️ Error, please try again later");
    // throw new Error(error);
  }
};
