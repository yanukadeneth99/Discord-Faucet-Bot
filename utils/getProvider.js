const ethers = require("ethers");
const { networks } = require("../config.json");

module.exports = (networkName) => {
  let url =
    networks[networkName].INFURA_URL ?? networks[networkName].ALCHEMY_URL;

  url ?? Error("Network not found");

  return new ethers.providers.JsonRpcProvider(url);
};
