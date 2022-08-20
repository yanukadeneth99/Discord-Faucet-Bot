// Responds user with the ping of the bot
require("dotenv").config({ path: "../.env" });

module.exports = async (interaction) => {
  if (
    interaction.guild &&
    interaction.member.roles.cache.some(
      (r) => r.id === process.env.DCB_ADMIN_ROLE_ID
    )
  ) {
    const sent = await interaction.reply({
      content: "Pinging...",
      fetchReply: true,
    });

    await interaction.editReply(
      `Roundtrip latency: ${
        sent.createdTimestamp - interaction.createdTimestamp
      }ms | Websocket heartbeat: ${interaction.client.ws.ping}ms.`
    );
  } else {
    await interaction.reply("You do not have permissions for this action");
  }
};
