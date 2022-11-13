// Returns a transaction object which can be used to transfer to the passed address
// Pass the token Name and Network Name if the transaction is meant to be using a ERC20 token

import { CeloWallet } from "@celo-tools/celo-ethers-wrapper";
import * as dotenv from "dotenv";
import { ethers } from "ethers";

import { stats, tokens } from "../config/config.json";
import erc20ABI from "../libs/erc20.json";
dotenv.config();

export default async (
	provider,
	usrAddress,
	networkName,
	tokenName?: any
): Promise<ethers.providers.TransactionResponse> => {
	// Create a wallet instance
	let wallet: ethers.Wallet;

	if (networkName == "celo") {
		wallet = new CeloWallet(process.env.WALLET_PRIVATE_KEY, provider);
	} else {
		wallet = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY, provider);
	}

	//* Native Transfer
	if (!tokenName) {
		const nonce = await provider.getTransactionCount(stats.walletAddress); // Get the latest nonce
		let txObj; // Holds the Transation Object

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
		// Create contract and get decimals
		const contract = new ethers.Contract(tokens[tokenName][networkName], erc20ABI, wallet);
		// const decimals = await contract.decimals();

		// Create Transaction object
		return (await contract.transfer(
			usrAddress,
			ethers.utils.parseEther(tokens[tokenName].amount.toString())
		)) as ethers.providers.TransactionResponse;
	}
};
