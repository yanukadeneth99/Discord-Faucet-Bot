/* 
Replies the user with user information or server information
ADMINS ONLY
*/

import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";

export default {
	data: new SlashCommandBuilder()
		.setName("info")
		.setDescription("Get info about a user or the server")
		.setDMPermission(false)
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
		.addSubcommand(subcommand =>
			subcommand
				.setName("user")
				.setDescription("Select the user")
				.addUserOption(option => option.setName("target").setDescription("The user"))
		)
		.addSubcommand(subcommand =>
			subcommand.setName("server").setDescription("Info about the server")
		),
};
