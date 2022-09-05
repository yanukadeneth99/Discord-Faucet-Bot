const ethers = require("ethers");
const { networks } = require("../config.json");

module.exports = (networkName) => {
  if (networkName == "mumbai") {
    let url =
      networks[networkName].INFURA_URL ?? networks[networkName].ALCHEMY_URL;
    return new ethers.providers.JsonRpcProvider(url);
  }

  const network = networks[networkName];
  const provider = ethers.getDefaultProvider(network, {
    infura: networks[networkName].INFURA_KEY,
    // Or if using a project secret:
    // infura: {
    //   projectId: YOUR_INFURA_PROJECT_ID,
    //   projectSecret: YOUR_INFURA_PROJECT_SECRET,
    // },
    alchemy: networks[networkName].ALCHEMY_URL,
  });
  return provider;
};
