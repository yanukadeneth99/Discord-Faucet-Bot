//* Returns a transaction object which can be used to transfer to the passed address
// Pass the token Name and Network Name if the transaction is meant to be using a ERC20 token

import { CeloWallet } from "@celo-tools/celo-ethers-wrapper";
import * as dotenv from "dotenv";
import { ethers } from "ethers";

import { stats, tokens } from "../config/config.json";
import erc20ABI from "../libs/erc20.json";
dotenv.config();

module.exports = async (
	provider: ethers.providers.JsonRpcProvider,
	usrAddress: string,
	networkName: string,
	tokenName?: any
): Promise<ethers.providers.TransactionResponse> => {
	// Create a wallet instance
	let wallet: ethers.Wallet;

	if (networkName == "celo") {
		wallet = new CeloWallet(process.env.WALLET_PRIVATE_KEY, provider);
	} else {
		wallet = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY, provider);
	}

	if (!wallet) throw new Error("Wallet Construction Failed!");

	//* Native Transfer
	if (!tokenName) {
		const nonce = await provider.getTransactionCount(stats.walletAddress); // Get the latest nonce
		let txObj: ethers.providers.TransactionRequest; // Holds the Transation Object

		if (networkName == "mumbai") {
			//* Polygon Network
			txObj = {
				to: usrAddress,
				nonce,
				value: ethers.utils.parseEther(stats.dailyEth.toString()),
				type: 2,
				maxFeePerGas: stats.maxFee,
				maxPriorityFeePerGas: stats.maxFee,
				gasLimit: "21000",
			};
		} else {
			//* Non-Polygon Networks
			txObj = {
				to: usrAddress,
				nonce,
				value: ethers.utils.parseEther(stats.dailyEth.toString()),
				type: 2,
			};
		}

		// Transaction (Call await on the receiving end)
		return await wallet.sendTransaction(txObj);
	}
	//* Token Transfer (ERC20)
	else {
		let address: string;
		let amount: string;

		// Get the Address from the Token List
		for (let i = 0; i < tokens.length; i++) {
			if (tokens[i].name == tokenName) {
				address = tokens[i][networkName];
				amount = tokens[i].amount.toString();
				break;
			}
		}

		if (!address) throw new Error("Address not Set to Transfer!");

		// Create contract and get decimals
		const contract = new ethers.Contract(address, erc20ABI, wallet);
		// const decimals = await contract.decimals();

		// Create Transaction object
		return (await contract.transfer(
			usrAddress,
			ethers.utils.parseEther(amount)
		)) as ethers.providers.TransactionResponse;
	}
};
