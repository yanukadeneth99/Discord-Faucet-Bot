//* Handles all kinds of interactions
// Add all new commands build to here

import { Interaction, InteractionType, TextChannel } from "discord.js";
import Keyv from "keyv";

import { ExtendedClient } from "../classes/ExtendedClient";
import { channels } from "../config/config.json";

const feedback_handle = require("../modals/feedback_handle");

module.exports = {
	name: "interactionCreate",
	async execute(keyv: Keyv, client: ExtendedClient, interaction: Interaction) {
		try {
			// Gets the Log Channel
			const errorchannel = client.channels.cache.get(channels.error) as TextChannel;

			//* Chat Command Interactions
			if (interaction.isChatInputCommand()) {
				if (interaction.commandName === "info") {
					require("../responses/info_response")(interaction);
				} else if (interaction.commandName === "ping") {
					require("../responses/ping_response")(interaction);
				} else if (interaction.commandName === "feedback") {
					require("../responses/feedback_response")(keyv, interaction);
				} else if (interaction.commandName === "balance") {
					require("../responses/balance_response")(interaction);
				} else if (interaction.commandName === "faucet") {
					require("../responses/faucet_response")(keyv, interaction);
				}
				// Invalid Chat command passed
				else {
					await interaction.reply({
						content: "👀 This Command does not exist!",
						ephemeral: true,
					});
					errorchannel.send(
						`[ERROR]\n${new Date(
							Date.now()
						).toUTCString()}\nInvalid Chat Command Passed\nBy : ${
							interaction.user.username
						}`
					);
					return;
				}
			}
			//* Modal Command Interactions
			else if (interaction.type === InteractionType.ModalSubmit) {
				if (interaction.customId === "feedbackModal") {
					try {
						// Handle the data from the modal
						await feedback_handle(client, interaction);
						// Reply the user
						await interaction.reply({
							content: `💁🏼‍♂️ Your feedback was received successfully!`,
							ephemeral: true,
						});
						await keyv.set(`${interaction.user.id}:feedback`, Date.now());
					} catch (error) {
						console.error(`Error Submitting Feedback : ${error}`);
						errorchannel.send(
							`[ERROR]\n${new Date(
								Date.now()
							).toUTCString()}\nSubmittingFeedback\n${error}`
						);
						await interaction.reply({
							content: "🙇‍♂️ Error, please try again later",
							ephemeral: true,
						});
					}
				}
				// Unknown Modal Submitted
				else {
					await interaction.reply({
						content: "👀 Invalid Modal Interaction!",
						ephemeral: true,
					});
					errorchannel.send(
						`[ERROR]\n${new Date(
							Date.now()
						).toUTCString()}\nInvalid Modal Interaction\nBy : ${
							interaction.user.username
						}`
					);
					return;
				}
			}
			//* Different kind of interaction
			else {
				errorchannel.send(
					`[ERROR]\n${new Date(
						Date.now()
					).toUTCString()}\nDifferent Kind of Interaction\n${interaction}`
				);
				return;
			}
		} catch (error) {
			const errorchannel = client.channels.cache.get(channels.error) as TextChannel;
			console.error(`Error Handling Interaction : ${error}`);
			errorchannel.send(
				`[ERROR]\n${new Date(Date.now()).toUTCString()}\nInteraction Handling\n${error}`
			);
		}
	},
};
