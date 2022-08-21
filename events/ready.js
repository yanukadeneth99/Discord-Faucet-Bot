// When the Bot Launches

const { channels } = require("../config.json");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}`);

    const logchannel = await client.channels.cache.get(channels.log);
    // logchannel.send(
    //   `[LOGIN] | ${new Date(
    //     Date.now()
    //   ).toUTCString()} | Faucet Bot | Restarted, and set activity`
    // );

    // Setting Status of Bot
    await client.user.setActivity("a tutorial on how to be a good bot", {
      type: "WATCHING",
    });
    await client.user.setStatus("online");
  },
};
