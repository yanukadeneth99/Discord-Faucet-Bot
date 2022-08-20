// Responds user with what he/she typed

module.exports = async (interaction) => {
  await interaction.reply(
    `You typed : ${interaction.options.getString("input")}`
  );
};
