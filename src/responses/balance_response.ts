//* Returns the balance of the Faucet Account in native Currency or the token passed

import { ChatInputCommandInteraction, TextChannel } from "discord.js";
import { ethers } from "ethers";

import { channels, networks, tokens } from "../config/config.json";

const getBalance = require("../utils/getBalance");
const getProvider = require("../utils/getProvider");

module.exports = async (interaction: ChatInputCommandInteraction): Promise<void> => {
	// Initial Responce to client
	await interaction.reply({ content: "👩‍💻 Calculating....", fetchReply: true });

	try {
		let balance: string; // Holds the final balance (string)

		// Get the Network and token from user input
		const networkName =
			interaction.options.getString("network") ?? networks[0].name.toLowerCase();
		const tokenName = interaction.options.getString("token");
		let suffix: string;

		// Get the Provider based on the network
		const provider = (await getProvider(networkName)) as ethers.providers.JsonRpcProvider;

		if (!tokenName) {
			//* Token not passed or native Currency (No ERC20 tokens)
			balance = await getBalance(provider);

			// Get Suffix
			for (let i = 0; i < networks.length; i++) {
				if (networkName == networks[i].name) {
					suffix = networks[i].nativeCurrency.toUpperCase();
					break;
				}
			}
		} else {
			//* Non native token (ERC 20 token)
			balance = await getBalance(provider, tokenName, networkName);

			// Get Suffix
			for (let i = 0; i < tokens.length; i++) {
				if (tokenName == tokens[i].name) {
					suffix = tokens[i].name.toUpperCase();
					break;
				}
			}
		}

		// Rounding off the value
		const balancefinal = balance.toString().slice(0, balance.toString().indexOf(".") + 3);

		// Printing the value out
		await interaction.editReply(`[${networkName.toUpperCase()}] [${balancefinal}] [${suffix}]`);
	} catch (error) {
		console.error(`Error [RESPONCE - BALANCE] : ${error}`);
		const errorchannel = interaction.client.channels.cache.get(channels.error) as TextChannel;
		errorchannel.send(
			`[ERROR]\n${new Date(Date.now()).toUTCString()}\nGetting Balance\n${error}`
		);
		await interaction.editReply("🙇‍♂️ Error, please try again later");
	}
};
