// Responds user with the ping of the bot

import { channels } from "../config/config.json";

export default async (interaction): Promise<void> => {
	// Initial Message
	const sent = await interaction.reply({
		content: "✈️ Pinging...",
		fetchReply: true,
	});

	try {
		await interaction.editReply(
			`☢️ Roundtrip latency: ${
				sent.createdTimestamp - interaction.createdTimestamp
			}ms | 🩸 Websocket heartbeat: ${interaction.client.ws.ping}ms.`
		);
	} catch (error) {
		console.error(`Error Getting Ping Response : ${error}`);
		const errorchannel = await interaction.client.channels.cache.get(channels.error);
		errorchannel.send(
			`[ERROR]\n${new Date(Date.now()).toUTCString()}\nGetting Ping Response\n${error}`
		);
		await interaction.editReply({
			content: "🙇‍♂️ Error, please try again later",
			ephemeral: true,
		});
	}
};
