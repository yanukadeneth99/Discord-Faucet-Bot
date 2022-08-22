// Responds user with the ping of the bot

module.exports = async (interaction) => {
  try {
    const sent = await interaction.reply({
      content: "✈️ Pinging...",
      fetchReply: true,
    });

    await interaction.editReply(
      `☢️ Roundtrip latency: ${
        sent.createdTimestamp - interaction.createdTimestamp
      }ms | 🩸 Websocket heartbeat: ${interaction.client.ws.ping}ms.`
    );
  } catch (error) {
    console.error(`Error [RESPONCE - PING] : ${error}`);
    await interaction.reply("🙇‍♂️ Error, please try again later");
    // throw new Error(error);
  }
};
