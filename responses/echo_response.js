// Responds user with what he/she typed

module.exports = async (interaction) => {
  await interaction.reply(`🌬 : ${interaction.options.getString("input")}`);
};
