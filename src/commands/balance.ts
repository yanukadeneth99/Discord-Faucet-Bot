/* 
* Get the Faucet Address balance of the Passed Network and token. If the token is not passed then the default native-currency is used
! ADMINS ONLY
If you change this, make sure to run `pnpm bot:deletecommands && pnpm bot:addcommands`
*/

import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";

import { networks, tokens } from "../config/config.json";

module.exports = {
	data: new SlashCommandBuilder()
		.setName("balance")
		.setDescription(
			"Get the balance remaining of the Faucet depending on the passed network and token"
		)
		.setDMPermission(false)
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
		.addStringOption(option => {
			option.setName("network").setDescription("Select the network").setRequired(true);

			networks.forEach(network => {
				option.addChoices({
					name: `${network.name.toUpperCase()}`,
					value: `${network.name.toLowerCase()}`,
				});
			});
			return option;
		})
		.addStringOption(option => {
			option
				.setName("token")
				.setDescription("Select the token if applicable")
				.setRequired(false);
			tokens.forEach(token => {
				option.addChoices({
					name: `${token.name.toUpperCase()}`,
					value: `${token.name.toLowerCase()}`,
				});
			});
			return option;
		}),
};
