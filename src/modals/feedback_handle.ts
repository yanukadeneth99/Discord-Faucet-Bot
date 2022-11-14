// Used in InteractionCreate.js to handle Feedback submission
// Data from the modal is printed in the feedback channel

import { ModalSubmitInteraction, TextChannel } from "discord.js";

import { ExtendedClient } from "../classes/ExtendedClient";
import { channels } from "../config/config.json";

module.exports = async (
	client: ExtendedClient,
	interaction: ModalSubmitInteraction
): Promise<void> => {
	// Get the Feedback Channel
	const fdChannel = client.channels.cache.get(channels.feedback) as TextChannel;

	// Get the value of the modal interactions
	const subject = interaction.fields.getTextInputValue("subject");
	const description = interaction.fields.getTextInputValue("description");
	const user = interaction.user.username;

	fdChannel.send(
		`[FEEDBACK]\n${new Date(
			Date.now()
		).toUTCString()}\nPerson : ${user}\nSubject : ${subject}\nDescription : ${description}`
	);
};
