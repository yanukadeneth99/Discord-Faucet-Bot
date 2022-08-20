module.exports = async (interaction) => {
  if (interaction.options.getSubcommand() === "user") {
    const user = interaction.options.getUser("target");

    if (user) {
      await interaction.reply(`Username: ${user.username}\nID: ${user.id}`);
    } else {
      await interaction.reply(
        `Your username: ${interaction.user.username}\nYour ID: ${interaction.user.id}`
      );
    }
  } else if (interaction.options.getSubcommand() === "server") {
    if (interaction.guild) {
      await interaction.reply(
        `Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`
      );
    } else {
      await interaction.reply("You need to be in a server!");
    }
  }
};
