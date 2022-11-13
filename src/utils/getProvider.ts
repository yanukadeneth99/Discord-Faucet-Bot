import { CeloProvider } from "@celo-tools/celo-ethers-wrapper";
import { ethers } from "ethers";

import { networks } from "../config/config.json";

export default async (networkName): Promise<ethers.providers.JsonRpcProvider> => {
	let url = networks[networkName].INFURA_URL ?? networks[networkName].ALCHEMY_URL;

	if (networkName == "celo") {
		const provider = new CeloProvider("https://alfajores-forno.celo-testnet.org");
		await provider.ready;
		return provider;
	}

	return new ethers.providers.JsonRpcProvider(url);
};
