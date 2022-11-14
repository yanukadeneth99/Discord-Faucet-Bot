//* Used in Faucet_response.js to display the transaction hash link

import { networks } from "../config/config.json";

module.exports = (networkName: string): string => {
	let url: string;

	for (let i = 0; i < networks.length; i++) {
		if (networkName == networks[i].name) {
			url = networks[i].scan;
			break;
		}
	}

	if (!url) throw new Error("Scan Link not set for the Network");

	return url;
};
