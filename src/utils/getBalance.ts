// Returns a string of the balance.
// If passed tokenName and networkName, then the interaction is considered as an ERC20, else it's considered native.

import { ethers } from "ethers";

import { stats, tokens } from "../config/config.json";
import erc20ABI from "../libs/erc20.json";

module.exports = async (
	provider: ethers.providers.JsonRpcProvider,
	tokenName?: string,
	networkName?: string
): Promise<string> => {
	//* Token Balance (ERC20)
	if (tokenName && networkName) {
		let address: string;

		// Loop until the correct address is found
		for (let i = 0; i < tokens.length; i++) {
			if (tokenName == tokens[i].name) {
				address = tokens[i][networkName];
				break;
			}
		}
		if (!address) throw Error("Token Address not found!");

		const contract = new ethers.Contract(address, erc20ABI, provider);
		return ethers.utils.formatEther((await contract.balanceOf(stats.walletAddress)).toString());
	}

	//* Native Balance
	return ethers.utils.formatEther(await provider.getBalance(stats.walletAddress));
};
