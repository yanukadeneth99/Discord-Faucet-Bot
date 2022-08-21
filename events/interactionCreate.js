// For all the Interactions

const { InteractionType } = require("discord.js");
const { channels } = require("../config.json");

module.exports = {
  name: "interactionCreate",
  async execute(client, interaction) {
    // Chat Commands only
    if (interaction.isChatInputCommand()) {
      if (interaction.commandName === "beep") {
        await require("../responses/beep_response")(interaction);
      } else if (interaction.commandName === "echo") {
        await require("../responses/echo_response")(interaction);
      } else if (interaction.commandName === "info") {
        await require("../responses/info_response")(interaction);
      } else if (interaction.commandName === "ping") {
        await require("../responses/ping_response")(interaction);
      } else if (interaction.commandName === "feedback") {
        await require("../responses/feedback_response")(interaction);
      } else if (interaction.commandName === "balance") {
        await require("../responses/balance_response")(interaction);
      }
    }
    // Modal Commands
    else if (interaction.type === InteractionType.ModalSubmit) {
      if (interaction.customId === "feedbackModal") {
        // Get the Feedback Channel
        const fdChannel = await client.channels.cache.get(channels.feedback);
        // Get the value of the sent messages and send on the feedback channel
        const subject = interaction.fields.getTextInputValue("subject");
        const description = interaction.fields.getTextInputValue("description");
        fdChannel.send(
          `[FEEDBACK] | ${new Date(
            Date.now()
          ).toUTCString()} | Subject : ${subject} | Description : ${description}`
        );
        // Reply the user
        await interaction.reply({
          content: `Your feedback of ${subject} was received successfully!`,
          ephemeral: true,
        });
      }
    }
    // Final Reply if non exists
    else {
      await interaction.reply({
        content: "This Command is either Deleted or Work in Progress!",
        ephemeral: true,
      });
    }
  },
};
