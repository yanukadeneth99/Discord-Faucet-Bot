//! Run `node delete-commands.js` to delete all the commands

const { REST } = require("@discordjs/rest");
const { Routes } = require("discord.js");
const { bot } = require("./config.json");

try {
  // Get the REST
  const rest = new REST({ version: "10" }).setToken(bot.token);

  //* Use to remove all commands from the Guild
  // rest
  //   .put(
  //     Routes.applicationGuildCommands(
  //       bot.clientId,
  //       bot.guildId
  //     ),
  //     { body: [] }
  //   )
  //   .then(() => console.log("Successfully deleted all guild commands."))
  //   .catch(console.error);

  //* Use to remove all commands publically
  rest
    .put(Routes.applicationCommands(bot.clientId), { body: [] })
    .then(() => console.log("Successfully deleted all application commands."))
    .catch(console.error);
} catch (error) {
  console.error(`Error deleting commands in delete-commands : ${error}`);
  throw new Error(error);
}
