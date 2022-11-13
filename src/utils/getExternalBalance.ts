import { ethers } from "ethers";

import { stats, tokens } from "../config/config.json";
import erc20ABI from "../libs/erc20.json";

module.exports = async (provider, tokenName, networkName): Promise<string> => {
	const address = tokens[tokenName][networkName];
	if (!address) throw Error("Token Address not found!");

	const contract = new ethers.Contract(address, erc20ABI, provider);
	return (await contract.balanceOf(stats.walletAddress)).toString();
};
