//* Transfers the set dailyEth value to the requested user.

import { ChatInputCommandInteraction, EmbedBuilder, TextChannel } from "discord.js";
import { ethers } from "ethers";
import Keyv from "keyv";

import { channels, stats, tokens } from "../config/config.json";

const getBalance = require("../utils/getBalance");
const getProvider = require("../utils/getProvider");
const getTxName = require("../utils/getTxName");
const handleRateLimiting = require("../utils/handleRateLimiting");
const transfer = require("../utils/transfer");

module.exports = async (keyv: Keyv, interaction: ChatInputCommandInteraction): Promise<void> => {
	// Initial Responce to client
	await interaction.reply({ content: "🤖 Mining....", fetchReply: true });

	try {
		// Setup the log channel
		const logchannel = interaction.client.channels.cache.get(channels.log) as TextChannel;

		// Get the Network,token and address from user input
		const usrAddress = interaction.options.getString("address");
		const networkName = interaction.options.getString("network");
		const tokenName = interaction.options.getString("token");

		// Check whether address is valid
		if (!ethers.utils.isAddress(usrAddress)) {
			await interaction.editReply("😤 Please enter a correct address");
			return;
		}

		// Get the Provider based on the network
		const provider = (await getProvider(networkName)) as ethers.providers.JsonRpcProvider;

		//* Native Transfer (No Token)
		if (!tokenName) {
			// If the balance is too low (curBalance is string)
			const curBalance = (await getBalance(provider)) as string;
			if (parseFloat(curBalance) < stats.dailyEth) {
				await interaction.editReply(
					`😥 Insufficient funds, please donate to : ${stats.walletAddress}`
				);
				return;
			}

			// Rate Limiting for nonce
			const nonceLimit = (await handleRateLimiting(
				interaction,
				networkName,
				stats.globalCoolDown,
				true,
				keyv
			)) as number | undefined;
			if (nonceLimit) {
				const timeLeft = Math.floor(
					(stats.globalCoolDown - (Date.now() - nonceLimit)) / 1000
				);
				await interaction.editReply(
					`🥶 Please wait for ${timeLeft} seconds before requesting`
				);
				return;
			}

			// Rate Limiting for non Admins
			const limit = (await handleRateLimiting(
				interaction,
				networkName,
				stats.coolDownTime,
				false,
				keyv
			)) as number | undefined;
			if (limit) {
				const timeLeft = Math.floor((stats.coolDownTime - (Date.now() - limit)) / 1000);
				await interaction.editReply(`😎 Cool people waits for ${timeLeft} seconds`);
				return;
			} else {
				await keyv.set(`${networkName}`, Date.now());
			}

			// Transaction
			const tx = (await transfer(
				provider,
				usrAddress,
				networkName
			)) as ethers.providers.TransactionResponse;
			logchannel.send(
				`[TX OBJ - NATIVE]\n${new Date(Date.now()).toUTCString()}\n${JSON.stringify(tx)}`
			);
			const string = await getTxName(networkName);
			const embed = new EmbedBuilder()
				.setColor("#3BA55C")
				.setDescription(`[View Transaction](${string}${tx.hash})`);
			await interaction.editReply({
				content: `👨‍🏭 Working Hard, please wait...`,
				embeds: [embed],
			});
			await tx.wait();
			await keyv.set(`${interaction.user.id}:${networkName}`, Date.now());
		}
		//* Non Native Transfer (ERC-20)
		else {
			// If there is no contract address for that token
			let address: string;
			let amount: number;
			for (let i = 0; i < tokens.length; i++) {
				if (tokenName == tokens[i].name) {
					address = tokens[i][networkName];
					amount = tokens[i].amount;
				}
			}

			if (!address) {
				await interaction.editReply(
					`😱 Token unavailable for network : ${networkName.toUpperCase()}`
				);
				return;
			}

			// If the balance is too low (curBalance is in a float)
			const curBalance = (await getBalance(provider, tokenName, networkName)) as string;
			if (parseFloat(curBalance) < amount) {
				await interaction.editReply(
					`😥 Insufficient funds, please donate ${tokenName.toUpperCase()} to : ${
						stats.walletAddress
					}`
				);
				return;
			}

			// Rate Limiting for nonce
			const nonceLimit = (await handleRateLimiting(
				interaction,
				networkName,
				stats.globalCoolDown,
				true,
				keyv
			)) as number | undefined;
			if (nonceLimit) {
				const timeLeft = Math.floor(
					(stats.globalCoolDown - (Date.now() - nonceLimit)) / 1000
				);
				await interaction.editReply(
					`🥶 Please wait for ${timeLeft} seconds before requesting`
				);
				return;
			}

			// Rate Limiting for non Admins
			const limit = (await handleRateLimiting(
				interaction,
				tokenName,
				stats.coolDownTime,
				false,
				keyv
			)) as number | undefined;
			if (limit) {
				const timeLeft = Math.floor((stats.coolDownTime - (Date.now() - limit)) / 1000);
				await interaction.editReply(`😎 Cool people waits for ${timeLeft} seconds`);
				return;
			} else {
				await keyv.set(`${networkName}`, Date.now());
			}

			// Transaction
			const tx = (await transfer(
				provider,
				usrAddress,
				networkName,
				tokenName
			)) as ethers.providers.TransactionResponse;
			logchannel.send(
				`[TX OBJ - ERC20]\n${new Date(Date.now()).toUTCString()}\n${JSON.stringify(tx)}`
			);
			const string = await getTxName(networkName);
			const embed = new EmbedBuilder()
				.setColor("#3BA55C")
				.setDescription(`[View Transaction](${string}${tx.hash})`);
			await interaction.editReply({
				content: `👨‍🏭 Working Hard, please wait...`,
				embeds: [embed],
			});
			await tx.wait();
			await keyv.set(`${interaction.user.id}:${tokenName}`, Date.now());
		}

		// Transfer Success
		if (tokenName) {
			logchannel.send(
				`[TRANSFER]\n${new Date(
					Date.now()
				).toUTCString()}\nNetwork : ${networkName.toUpperCase()}\nToken : ${tokenName.toUpperCase()}\nBy : ${
					interaction.user.username
				}\nTo : ${usrAddress}`
			);
		} else {
			logchannel.send(
				`[TRANSFER]\n${new Date(
					Date.now()
				).toUTCString()}\nNetwork : ${networkName.toUpperCase()}\nBy : ${
					interaction.user.username
				}\nTo : ${usrAddress}`
			);
		}
		await interaction.editReply("💁 Transfer Successful, Happy Coding!");
	} catch (error) {
		console.error(`Error Transferring : ${error}`);
		const errorchannel = interaction.client.channels.cache.get(channels.error) as TextChannel;
		errorchannel.send(`[ERROR]\n${new Date(Date.now()).toUTCString()}\nTransferring\n${error}`);
		await interaction.editReply("🙇‍♂️ Error : Please try again in few minutes");
	}
};
