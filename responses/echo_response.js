// Responds user with what he typed

module.exports = async (interaction) => {
  await interaction.reply(`You typed : ${interaction.options.getString("input")}`);
};
