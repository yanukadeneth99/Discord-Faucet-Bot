import { ActivityType, Client, ClientOptions, Presence } from "discord.js";

// Extending Client to add additional parameters

export class ExtendedClient extends Client {
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
