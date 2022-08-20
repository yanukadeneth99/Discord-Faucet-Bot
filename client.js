// Exporting the Client

const { Client, Intents } = require("discord.js");

// Create a new Client with these permissions
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

module.exports = client;
