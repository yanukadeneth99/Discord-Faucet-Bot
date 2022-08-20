// Exporting the Client

const { Client, GatewayIntentBits } = require("discord.js");

// Create a new Client with these permissions
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

module.exports = client;
