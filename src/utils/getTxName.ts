// Used in Faucet_response.js to display the transaction hash link

module.exports = async (networkName): Promise<string> => {
	if (networkName == "mumbai") {
		return `https://${networkName}.polygonscan.com/tx/`;
	}
	return `https://${networkName}.etherscan.io/tx/`;
};
