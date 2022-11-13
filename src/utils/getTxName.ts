// Used in Faucet_response.js to display the transaction hash link

export default async (networkName) => {
  if (networkName == "mumbai") {
    return `https://${networkName}.polygonscan.com/tx/`;
  }
  return `https://${networkName}.etherscan.io/tx/`;
};
