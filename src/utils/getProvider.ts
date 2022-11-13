import { CeloProvider } from "@celo-tools/celo-ethers-wrapper";
import { ethers } from "ethers";

import { networks } from "../config/config.json";

module.exports = async (networkName: string): Promise<ethers.providers.JsonRpcProvider> => {
	let url: string = networks[networkName].INFURA_URL ?? networks[networkName].ALCHEMY_URL;

	if (networkName == "celo") {
		const provider = new CeloProvider("https://alfajores-forno.celo-testnet.org");
		await provider.ready;
		return provider;
	}
	const provider = new ethers.providers.JsonRpcProvider(url);
	await provider.ready;
	return provider;
};
