// Exporting the Client

const { Client, GatewayIntentBits } = require("discord.js");

// Create a new Client with these permissions
export default new Client({ intents: [GatewayIntentBits.Guilds] });
