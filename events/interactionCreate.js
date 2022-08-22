//* Handles all kinds of interactions
// Add all new commands build to here

// TODO : Remove Catches from here and handle them in the responses themselves

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
        if (interaction.commandName === "info") {
          require("../responses/info_response")(interaction);
        } else if (interaction.commandName === "ping") {
          require("../responses/ping_response")(interaction);
        } else if (interaction.commandName === "feedback") {
          require("../responses/feedback_response")(interaction);
        } else if (interaction.commandName === "balance") {
          require("../responses/balance_response")(interaction);
        } else if (interaction.commandName === "faucet") {
          require("../responses/faucet_response")(interaction);
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
          } catch (error) {
            console.error(`Error Submitting Feedback : ${error}`);
            logchannel.send(
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
          logchannel.send(
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
        console.log(`Different kind of interaction : ${interaction}`);
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
    }
  },
};
