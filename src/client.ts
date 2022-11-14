// Exporting the Client

import { GatewayIntentBits } from "discord.js";

import { ExtendedClient } from "./classes/ExtendedClient";

// Create a new Client with these permissions
export default new ExtendedClient({ intents: [GatewayIntentBits.Guilds] });
