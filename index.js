// Starting Point of the project : run `node .`
const fs = require("node:fs");
const path = require("node:path");
const { Collection } = require("discord.js");
const { bot } = require("./config.json");
const client = require("./client"); // Get Client

// Run the Events
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
    client.on(event.name, (...args) => event.execute(client, ...args));
  }
}

// Gets all command files, and sets them

client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  //Set a new item in the Collection
  // With the key as the command name and the value as the exported module
  client.commands.set(command.data.name, command);
}

// Login to Bot with token
try {
  client.login(bot.token);
} catch (error) {
  console.error(`Error login to BOT at index : ${error}`);
}
