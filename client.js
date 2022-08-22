// Exporting the Client

const { Client, GatewayIntentBits } = require("discord.js");

// Create a new Client with these permissions
try {
  const client = new Client({ intents: [GatewayIntentBits.Guilds] });
  module.exports = client;
} catch (error) {
  console.error(`Error getting client in client: ${error}`);
  throw new Error(error);
}
