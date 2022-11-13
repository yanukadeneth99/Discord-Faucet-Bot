// Used in InteractionCreate.js to handle Feedback submission
// Data from the modal is printed in the feedback channel

const { channels } = require("../config.json");

module.exports = async (client, interaction) => {
  // Get the Feedback Channel
  const fdChannel = await client.channels.cache.get(channels.feedback);

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
