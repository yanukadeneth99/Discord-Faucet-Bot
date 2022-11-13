import ethers from "ethers";
import erc20ABI from "../libs/erc20.json";
import { tokens, stats } from "../config.json";

export default async (provider, tokenName, networkName) => {
  const address = tokens[tokenName][networkName];
  if (!address) throw Error("Token Address not found!");

  const contract = new ethers.Contract(address, erc20ABI, provider);
  return (await contract.balanceOf(stats.walletAddress)).toString();
};
