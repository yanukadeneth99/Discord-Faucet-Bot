// Used at delete-commands.js to delete all the commands in the BOT

const { REST } = require("@discordjs/rest");
const { Routes } = require("discord.js");
const { bot } = require("../config.json");
require("dotenv").config();

module.exports = async (globally = false) => {
  const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN);

  //! Removes the commands globally
  if (globally) {
    await rest.put(Routes.applicationCommands(bot.clientId), { body: [] });
    console.log("Successfully deleted all commands.");
    return;
  }

  //* Deletes only the commands in the passed guild
  await rest.put(Routes.applicationGuildCommands(bot.clientId, bot.guildId), {
    body: [],
  });
  console.log("Successfully deleted all guild commands.");
  return;
};
