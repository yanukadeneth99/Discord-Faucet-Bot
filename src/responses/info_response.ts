//* Replies with either user info or server info

import { ChatInputCommandInteraction, TextChannel } from "discord.js";

import { channels } from "../config/config.json";

module.exports = async (interaction: ChatInputCommandInteraction): Promise<void> => {
	// Initial Message
	await interaction.reply({
		content: "🏃 Getting...",
		fetchReply: true,
		ephemeral: true, 
	});
	try {
		if (interaction.options.getSubcommand() === "user") {
			const user = interaction.options.getUser("target");

			if (user) {
				await interaction.editReply(`🐒 Username: ${user.username}\nID: ${user.id}`);
			} else {
				await interaction.editReply(
					`🐒 Your username: ${interaction.user.username}\nYour ID: ${interaction.user.id}`
				);
			}
		} else if (interaction.options.getSubcommand() === "server") {
			if (interaction.guild) {
				await interaction.editReply(
					`🕸 Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`
				);
			} else {
				await interaction.editReply("🧯 You need to be in a server!");
			}
		}
	} catch (error) {
		console.error(`Error Getting Info : ${error}`);
		const errorchannel = interaction.client.channels.cache.get(channels.error) as TextChannel;
		errorchannel.send(`[ERROR]\n${new Date(Date.now()).toUTCString()}\nGettng Into\n${error}`);
		await interaction.editReply("🙇‍♂️ Error, please try again later");
	}
};
