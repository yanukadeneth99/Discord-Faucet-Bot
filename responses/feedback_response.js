// Responds the user by building a Form
//TODO : Rate Limit Feedbacks
const {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");
const { channels } = require("../config.json");

module.exports = async (interaction) => {
  try {
    // Create the modal
    const modal = new ModalBuilder()
      .setCustomId("feedbackModal")
      .setTitle("Faucet Feedback Form");

    // Subject
    const subject = new TextInputBuilder()
      .setCustomId("subject")
      .setLabel("Subject")
      .setStyle(TextInputStyle.Short)
      .setPlaceholder("Short Topic of Feedback")
      .setRequired(true);

    // Long Description of the feedback
    const description = new TextInputBuilder()
      .setCustomId("description")
      .setLabel("Describe your feedback")
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true);

    // An action row only holds one text input,
    // so you need one action row per text input.
    const firstActionRow = new ActionRowBuilder().addComponents(subject);
    const secondActionRow = new ActionRowBuilder().addComponents(description);

    // Add inputs to the modal
    modal.addComponents(firstActionRow, secondActionRow);

    // Show the modal to the user
    await interaction.showModal(modal);
  } catch (error) {
    console.error(`Error Creating Feedback Modal : ${error}`);
    const logchannel = await interaction.client.channels.cache.get(
      channels.log
    );
    logchannel.send(
      `[ERROR]\n${new Date(
        Date.now()
      ).toUTCString()}\nBuilding Feedback Modal\n${error}`
    );
    throw new Error(error);
  }
};
