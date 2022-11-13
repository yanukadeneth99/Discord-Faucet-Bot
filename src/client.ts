// Exporting the Client

import { ActivityType, Client, ClientOptions, GatewayIntentBits, Presence } from "discord.js";

// Extending Client to add additional parameters
class Extendedlient extends Client {
	commands: unknown | any;
	constructor(clientOptions: ClientOptions) {
		super(clientOptions);
	}

	public setPresence(
		type: Exclude<ActivityType, ActivityType.Custom>,
		name: string,
		url: string
	): Presence {
		return this.user?.setPresence({
			activities: [
				{
					type,
					name,
					url,
				},
			],
		});
	}
}

// Create a new Client with these permissions
const client = new Extendedlient({ intents: [GatewayIntentBits.Guilds] });
export default client;
