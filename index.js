//* Run node deploy-commands to register the commands added

// Requires
const fs = require("fs");
const { Collection } = require("discord.js");
require("dotenv").config({ path: ".env" });
const client = require("./client"); // Get Client

// Get the Events
const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));

// Run the Events depending on whether it's once or on.
for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// Setting Commands
client.commands = new Collection();

// Gets all command files
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

// Setting the command for every file
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
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
