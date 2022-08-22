// Log Printing and setting Discord Presence when the BOT wakes

const { channels } = require("../config.json");
const { ActivityType } = require("discord.js");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    try {
      // Morning Print of Waking Up
      const logchannel = await client.channels.cache.get(channels.log);
      logchannel.send(
        `[LOGIN/RESTART]\n${new Date(
          Date.now()
        ).toUTCString()}\nFaucet Bot Woken`
      );

      // Setting Status of Bot
      client.user.setActivity("Minting...", {
        type: ActivityType.Competing,
      });
      client.user.setStatus("dnd");
      console.log(`Ready! Logged in as ${client.user.tag}`);
    } catch (error) {
      console.error(`Error Starting BOT in ready : ${error}`);
      const logchannel = await client.channels.cache.get(channels.log);
      logchannel.send(
        `[ERROR]\n${new Date(Date.now()).toUTCString()}\nWaking BOT\n${error}`
      );
    }
  },
};
