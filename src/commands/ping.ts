/* 
Prints the Ping of the BOT
ADMINS ONLY
*/

import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Check the ping of the bot")
		.setDMPermission(false)
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
};
