//* Handles Rate Limiting

// Returns undefined if there is no limit, returns an integer in seconds if there is a limit being applied
// Sets the timers in

import Keyv = require("keyv");

import { stats } from "../config/config.json";
import { NonceCoolDown, Source, UserCoolDown } from "../database";

const { bypassRoles } = require("../config/config.json");

// Nonce is the timer between transactions to prevent the same one from occuring
module.exports = {
	getTimer: async (
		interaction: any,
		network: string,
		nonce = false,
		keyv?: Keyv
	): Promise<number | undefined> => {
		//* Limited for non Admins
		if (bypassRoles.some(role => !interaction.member.roles.cache.has(role))) {
			// KeyV Database Selected
			if (stats.database.toLowerCase() == "keyv") {
				const lastReqTime: number = nonce
					? await keyv.get(`${network}`)
					: await keyv.get(`${interaction.user.id}:${network}`);
				if (lastReqTime) {
					if (
						Date.now() - lastReqTime <
						(nonce ? stats.globalCoolDown : stats.coolDownTime)
					) {
						return lastReqTime;
					}
				}
			}
			// Postgres Database Selected
			else if (
				stats.database.toLowerCase() == "postgres" ||
				stats.database.toLowerCase() == "pg"
			) {
				// Return Nonce if it exists and is higher than the timer
				if (nonce) {
					const nonceObj = await NonceCoolDown.findOneBy({ network });
					if (nonceObj) {
						const lastReqTime = nonceObj.unlockTime.getTime();
						if (Date.now() - lastReqTime < stats.globalCoolDown) {
							return lastReqTime;
						}
						return undefined;
					}
				}

				// Get User and return the time if it exists
				const userId = interaction.user.id;
				const user = await UserCoolDown.findOneBy({
					userId,
					network,
				});

				// If the user exists, return the value if it's less than the cooldown Times
				if (user) {
					const lastReqTime = user.unlockTime.getTime();
					if (Date.now() - lastReqTime < stats.coolDownTime) {
						return lastReqTime;
					}
				}
			}
			return undefined;
		}
	},

	setTimer: async (
		interaction: any,
		network: string,
		nonce = false,
		keyv?: Keyv
	): Promise<void> => {
		//* Limited for non Admins
		if (bypassRoles.some(role => !interaction.member.roles.cache.has(role))) {
			// KeyV Database Selected
			if (stats.database.toLowerCase() == "keyv") {
				// Set Nonce
				if (nonce) {
					keyv.set(`${network}`, Date.now());
					return;
				}

				// Set User Values
				await keyv.set(`${interaction.user.id}:${network}`, Date.now());
				return;
			}
			// Postgres Database Selected
			else if (
				stats.database.toLowerCase() == "postgres" ||
				stats.database.toLowerCase() == "pg"
			) {
				let userRequest: UserCoolDown;
				let nonceRequest: NonceCoolDown;

				// If it's nonce, create or update a row
				if (nonce) {
					nonceRequest = await NonceCoolDown.findOneBy({
						network,
					});
					if (nonceRequest) {
						nonceRequest.unlockTime = new Date();
					} else {
						nonceRequest = new NonceCoolDown();
						nonceRequest.unlockTime = new Date();
						nonceRequest.network = network;
					}

					// Save
					await Source.manager.save(nonceRequest);
					return;
				}

				const userId = interaction.user.id;
				userRequest = await UserCoolDown.findOneBy({
					userId,
					network,
				});
				if (userRequest) {
					userRequest.unlockTime = new Date();
				} else {
					userRequest = new UserCoolDown();
					userRequest.unlockTime = new Date();
					userRequest.network = network;
					userRequest.userId = userId;
				}

				// Save
				await Source.manager.save(userRequest);
				return;
			}
		}
	},
};
