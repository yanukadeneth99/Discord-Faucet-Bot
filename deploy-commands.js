//? Run `node deploy-commands.js` to set the commands

const fs = require("node:fs");
const path = require("node:path");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord.js");
const { bot } = require("./config.json");

// Get the commands from the `/commands` folder and to the array
try {
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
} catch (error) {
  console.error(`Error getting commands in deploy-commands : ${error}`);
  throw new Error(error);
}

// Get the REST
try {
  const rest = new REST({ version: "10" }).setToken(bot.token);

  //* Use for Development (Updates only the passed guild data)
  rest
    .put(Routes.applicationGuildCommands(bot.clientId, bot.guildId), {
      body: commands,
    })
    .then(() => console.log("Successfully registered application commands"))
    .catch(console.error);

  //* Use for Production as it updates the commands public
  // rest
  //   .put(Routes.applicationCommands(bot.clientId), {
  //     body: commands,
  //   })
  //   .then(() => console.log("Successfully registered application commands"))
  //   .catch(console.error);
} catch (error) {
  console.error(`Error pushing commands in deploy-commands : ${error}`);
  throw new Error(error);
}
