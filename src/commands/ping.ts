/* 
Prints the Ping of the BOT
ADMINS ONLY
*/

import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Check the ping of the bot")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
};
