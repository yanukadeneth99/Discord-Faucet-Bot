/* 
Get the Faucet Address balance of the Passed Network and token. If the token is not passed then the default native-currency is used
ADMINS ONLY
* Change this if you add more networks/tokens and deploy the commands again using `node deploy-commands`
*/

import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

// TODO : Make this object dynamic (Get from config)

export default {
  data: new SlashCommandBuilder()
    .setName("balance")
    .setDescription(
      "Get the balance remaining of the Faucet depending on the passed network and token"
    )
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addStringOption((option) =>
      option
        .setName("network")
        .setDescription("Select the network")
        .setRequired(true)
        .addChoices(
          {
            name: "Goerli",
            value: "goerli",
          },
          {
            name: "Rinkeby",
            value: "rinkeby",
          },
          {
            name: "Mumbai",
            value: "mumbai",
          }
        )
    )
    .addStringOption((option) =>
      option
        .setName("token")
        .setDescription("Select the token if applicable")
        .setRequired(false)
        .addChoices({
          name: "LINK",
          value: "link",
        })
    ),
};
