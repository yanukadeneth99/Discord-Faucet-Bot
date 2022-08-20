//* Run node deploy-commands to register the commands added

// Requires
const fs = require("node:fs");
const path = require("node:path");
const { Collection } = require("discord.js");
require("dotenv").config({ path: ".env" });
const client = require("./client"); // Get Client

// Run the Events depending on whether it's once or on.
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const ePath = path.join(eventsPath, file);
  const event = require(ePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// Setting Commands
client.commands = new Collection();

// Gets all command files
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

// Setting the command for every file
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  //Set a new item in the Collection
  // With the key as the command name and the value as the exported module
  client.commands.set(command.data.name, command);
}

// Login to the Bot
try {
  client.login(process.env.DCB_TOKEN);
} catch (error) {
  console.error(error);
}
