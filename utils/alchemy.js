// Retun an alchemy instance

const { Network, Alchemy } = require("alchemy-sdk");
const { stats } = require("../config.json");

const settings = {
  apiKey: stats.ALCHEMY_KEY,
  network: Network.ETH_GOERLI,
};

module.exports = new Alchemy(settings);
