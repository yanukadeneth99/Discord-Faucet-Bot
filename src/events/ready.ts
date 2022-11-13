// Log Printing and setting Discord Presence when the BOT wakes

import { channels } from "../config/config.json";
import { ActivityType } from "discord.js";

export default {
  name: "ready",
  once: true,
  async execute(client) {
    try {
      // Setting Status of Bot
      client.user.setActivity("LearnWeb3DAO", {
        type: ActivityType.Watching,
      });
      client.user.setStatus("online");

      // Morning Print of Waking Up
      const logchannel = await client.channels.cache.get(channels.log);
      logchannel.send(
        `[LOGIN/RESTART]\n${new Date(
          Date.now()
        ).toUTCString()}\nFaucet Bot Woken`
      );

      console.log(`Ready! Logged in as ${client.user.tag}`);
    } catch (error) {
      console.error(`Error Starting BOT in ready : ${error}`);
      const errorchannel = await client.channels.cache.get(channels.error);
      errorchannel.send(
        `[ERROR]\n${new Date(Date.now()).toUTCString()}\nWaking BOT\n${error}`
      );
    }
  },
};
