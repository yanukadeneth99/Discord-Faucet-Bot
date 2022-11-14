/* 
* Users can pass feedback which will be printed in a feedback discord channel.
If you change this, make sure to run `pnpm bot:deletecommands && pnpm bot:addcommands`
! Rate limited
*/

import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";

module.exports = {
	data: new SlashCommandBuilder()
		.setName("feedback")
		.setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
		.setDescription(
			"Send Feedback regarding the Faucet Bot. Your discord username will be recorded."
		)
		.setDMPermission(false),
};
