// Responds user with what he/she typed

module.exports = async (interaction) => {
  try {
    await interaction.reply(`🌬 : ${interaction.options.getString("input")}`);
  } catch (error) {
    console.error(`Error [RESPONCE - ECHO] : ${error}`);
    await interaction.reply("🙇‍♂️ Error, please try again later");
    // throw new Error(error);
  }
};
