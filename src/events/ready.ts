// Log Printing and setting Discord Presence when the BOT wakes

import { ActivityType } from "discord.js";

import { channels } from "../config/config.json";

module.exports = {
	name: "ready",
	once: true,
	async execute(client: any) {
		try {
			// Setting Status of Bot
			client.user.setActivity("LearnWeb3DAO", {
				type: ActivityType.Watching,
			});
			client.user.setStatus("online");

			// Morning Print of Waking Up
			const logchannel = await client.channels.cache.get(channels.log);
			logchannel.send(
				`[LOGIN/RESTART]\n${new Date(Date.now()).toUTCString()}\nFaucet Bot Woken`
			);

			console.log(`Ready! Logged in as ${client.user.tag}`);
		} catch (error) {
			console.error(`Error Starting BOT in ready : ${error}`);
			const errorchannel = await client.channels.cache.get(channels.error);
			errorchannel.send(
				`[ERROR]\n${new Date(Date.now()).toUTCString()}\nWaking BOT\n${error}`
			);
		}
	},
};
