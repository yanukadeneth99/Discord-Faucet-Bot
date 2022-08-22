//* Handles all kinds of interactions
// Add all new commands build to here

// TODO : Make two individual catches for commands and modals
// TODO : Bit too much Try Catches and Error Handling, try to minimize them as much as possible

const { InteractionType } = require("discord.js");
const { channels } = require("../config.json");
const feedback_handle = require("../modals/feedback_handle");

module.exports = {
  name: "interactionCreate",
  async execute(client, interaction) {
    try {
      // Get the Log Channel
      const logchannel = await client.channels.cache.get(channels.log);

      //* Chat Command Interactions
      if (interaction.isChatInputCommand()) {
        try {
          if (interaction.commandName === "info") {
            await require("../responses/info_response")(interaction);
          } else if (interaction.commandName === "ping") {
            await require("../responses/ping_response")(interaction);
          } else if (interaction.commandName === "feedback") {
            await require("../responses/feedback_response")(interaction);
          } else if (interaction.commandName === "balance") {
            await require("../responses/balance_response")(interaction);
          } else if (interaction.commandName === "faucet") {
            await require("../responses/faucet_response")(interaction);
          }
          // Invalid Chat command passed
          else {
            await interaction.reply({
              content: "👀 This Command does not exist!",
              ephemeral: true,
            });
            logchannel.send(
              `[ERROR]\n${new Date(
                Date.now()
              ).toUTCString()}\nInvalid Chat Command Passed\nBy : ${
                interaction.user.username
              }`
            );
            return;
          }
        } catch (error) {
          // Handle Errors thrown by the Commands
          console.error(`Error handling Chat Input : ${error}`);
          logchannel.send(
            `[ERROR]\n${new Date(
              Date.now()
            ).toUTCString()}\nHandling Chat Inputs\n${error}`
          );
          await interaction.editReply({
            content: "🙇‍♂️ Error, please try again later",
            ephemeral: true,
          });
        }
      }
      //* Modal Command Interactions
      else if (interaction.type === InteractionType.ModalSubmit) {
        try {
          if (interaction.customId === "feedbackModal") {
            // Handle the data from the modal
            feedback_handle(client, interaction);
            // Reply the user
            await interaction.reply({
              content: `💁🏼‍♂️ Your feedback was received successfully!`,
              ephemeral: true,
            });
            return;
          }
          // Unknown Modal Submitted
          else {
            await interaction.reply({
              content: "👀 Invalid Modal Interaction!",
              ephemeral: true,
            });
            logchannel.send(
              `[ERROR]\n${new Date(
                Date.now()
              ).toUTCString()}\nInvalid Modal Interaction\nBy : ${
                interaction.user.username
              }`
            );
            return;
          }
        } catch (error) {
          // Handle Errors thrown by Modals
          console.error(`Error handling Chat Input : ${error}`);
          logchannel.send(
            `[ERROR]\n${new Date(
              Date.now()
            ).toUTCString()}\nHandling Chat Inputs\n${error}`
          );
          await interaction.editReply({
            content: "🙇‍♂️ Error, please try again later",
            ephemeral: true,
          });
        }
      }
      // Different kind of interaction
      else {
        return;
      }
    } catch (error) {
      const logChannel = await client.channels.cache.get(channels.log);
      console.error(`Error Handling Interaction : ${error}`);
      logChannel.send(
        `[ERROR]\n${new Date(
          Date.now()
        ).toUTCString()}\nInteraction Handling\n${error}`
      );
      throw new Error("Unable to Run Interactions");
    }
  },
};
