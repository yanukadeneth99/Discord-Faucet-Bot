// For all the Interactions

module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return; // Drop if the input isn't a command

    if (interaction.commandName === "beep") {
      await require("../responses/beep_response")(interaction);
    } else if (interaction.commandName === "echo") {
      await require("../responses/echo_response")(interaction);
    } else if (interaction.commandName === "info") {
      await require("../responses/info_response")(interaction);
    } else if (interaction.commandName === "ping") {
      await require("../responses/ping_response")(interaction);
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
