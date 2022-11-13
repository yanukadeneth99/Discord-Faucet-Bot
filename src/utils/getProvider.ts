import ethers from "ethers";
import { networks } from "../config.json";

export default (networkName) => {
  let url =
    networks[networkName].INFURA_URL ?? networks[networkName].ALCHEMY_URL;

  return new ethers.providers.JsonRpcProvider(url);
};
