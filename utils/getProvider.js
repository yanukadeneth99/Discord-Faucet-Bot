const ethers = require("ethers");
const { networks } = require("../config.json");

module.exports = (networkName) => {
  try {
    let url =
      networks[networkName].INFURA_URL ?? networks[networkName].ALCHEMY_URL;

    url ?? Error("Network not found");

    //? Running on public RPC
    return ethers.getDefaultProvider(networkName);

    // return new ethers.providers.JsonRpcProvider(url);
  } catch (error) {
    console.error(`Error getting provider at getProvider : ${error}`);
    throw new Error(error);
  }
};
