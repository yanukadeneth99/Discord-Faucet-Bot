//* Run `node deploy-commands.js` to set the commands

const fs = require("node:fs");
const path = require("node:path");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord.js");
require("dotenv").config();

// Get the commands from the `/commands` folder and to the array
const commands = [];
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const commandPath = path.join(commandsPath, file);
  const command = require(commandPath);
  commands.push(command.data.toJSON());
}

// Get the REST
const rest = new REST({ version: "10" }).setToken(process.env.DCB_TOKEN);

//* Use for Development (Updates only the passed guild data)
rest
  .put(
    Routes.applicationGuildCommands(
      process.env.DCB_CLIENT_ID,
      process.env.DCB_GUILD_ID
    ),
    { body: commands }
  )
  .then(() => console.log("Successfully registered application commands"))
  .catch(console.error);

//* Use for Production as it updates the commands public
// rest
//   .put(Routes.applicationCommands(process.env.DCB_CLIENT_ID), {
//     body: commands,
//   })
//   .then(() => console.log("Successfully registered application commands"))
//   .catch(console.error);
