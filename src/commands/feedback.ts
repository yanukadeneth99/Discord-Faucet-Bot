/* 
Users can pass feedback which will be printed in a feedback discord channel.
Rate limited
*/

import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";

export default {
	name: "Feedback",
	data: new SlashCommandBuilder()
		.setName("feedback")
		.setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
		.setDescription(
			"Send Feedback regarding the Faucet Bot. Your discord username will be recorded."
		)
		.setDMPermission(false),
};
