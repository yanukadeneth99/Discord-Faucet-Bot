// Responds user with the ping of the bot

const { channels } = require("../config.json");

module.exports = async (interaction) => {
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
    const logchannel = await interaction.client.channels.cache.get(
      channels.log
    );
    logchannel.send(
      `[ERROR]\n${new Date(
        Date.now()
      ).toUTCString()}\nGetting Ping Response\n${error}`
    );
    await interaction.editReply({
      content: "🙇‍♂️ Error, please try again later",
      ephemeral: true,
    });
  }
};
