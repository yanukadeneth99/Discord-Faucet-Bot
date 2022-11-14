// Log Printing and setting Discord Presence when the BOT wakes

import { ActivityType, TextChannel } from "discord.js";

import { ExtendedClient } from "../classes/ExtendedClient";
import { channels } from "../config/config.json";

module.exports = {
	name: "ready",
	once: true,
	async execute(client: ExtendedClient) {
		try {
			// Setting Status of Bot
			client.user.setActivity("LearnWeb3DAO", {
				type: ActivityType.Watching,
			});
			client.user.setStatus("online");

			// Morning Print of Waking Up
			const logchannel = client.channels.cache.get(channels.log) as TextChannel;
			logchannel.send(
				`[LOGIN/RESTART]\n${new Date(Date.now()).toUTCString()}\nFaucet Bot Woken`
			);

			console.log(`Ready! Logged in as ${client.user.tag}`);
		} catch (error) {
			console.error(`Error Starting BOT in ready : ${error}`);
			const errorchannel = client.channels.cache.get(channels.error) as TextChannel;
			errorchannel.send(
				`[ERROR]\n${new Date(Date.now()).toUTCString()}\nWaking BOT\n${error}`
			);
		}
	},
};
