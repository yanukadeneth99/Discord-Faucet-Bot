// Responds user with the ping of the bot

module.exports = async (interaction) => {
  const sent = await interaction.reply({
    content: "Pinging...",
    fetchReply: true,
  });

  await interaction.editReply(
    `Roundtrip latency: ${
      sent.createdTimestamp - interaction.createdTimestamp
    }ms | Websocket heartbeat: ${interaction.client.ws.ping}ms.`
  );
};
