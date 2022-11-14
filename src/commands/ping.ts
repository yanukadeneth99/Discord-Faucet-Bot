/* 
* Prints the Ping of the BOT
If you change this, make sure to run `pnpm bot:deletecommands && pnpm bot:addcommands`
! ADMINS ONLY
*/

import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Check the ping of the bot")
		.setDMPermission(false)
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
};
