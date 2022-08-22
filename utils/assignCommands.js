// Used at deploy-commands.js to deploy the commands into the BOT

const { REST } = require("@discordjs/rest");
const { Routes } = require("discord.js");
const { bot } = require("../config.json");

module.exports = async (commands, globally = false) => {
  const rest = new REST({ version: "10" }).setToken(bot.token);

  //* Use for Production (Updates the commands globally)
  if (globally) {
    await rest.put(Routes.applicationCommands(bot.clientId), {
      body: commands,
    });
    console.log("Successfully registered commands globally");
    return;
  }

  //* Use for Development (Updates only the passed guild data)
  await rest.put(Routes.applicationGuildCommands(bot.clientId, bot.guildId), {
    body: commands,
  });
  console.log("Successfully registered commands to the guild server");
  return;
};
