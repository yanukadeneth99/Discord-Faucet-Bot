//! Run `node delete-commands.js` to delete all the commands

const { REST } = require("@discordjs/rest");
const { Routes } = require("discord.js");
require("dotenv").config();

// Get the REST
const rest = new REST({ version: "10" }).setToken(process.env.DCB_TOKEN);

//* Use to remove all commands from the Guild
// rest
//   .put(
//     Routes.applicationGuildCommands(
//       process.env.DCB_CLIENT_ID,
//       process.env.DCB_GUILD_ID
//     ),
//     { body: [] }
//   )
//   .then(() => console.log("Successfully deleted all guild commands."))
//   .catch(console.error);

//* Use to remove all commands publically
rest
  .put(Routes.applicationCommands(process.env.DCB_CLIENT_ID), { body: [] })
  .then(() => console.log("Successfully deleted all application commands."))
  .catch(console.error);
