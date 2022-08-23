/* 
Users can use to claim free eth daily per account from the passed network and token
* Change this if you add more networks/tokens and deploy the commands again using `node deploy-commands`
*/

const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("faucet")
    .setDescription("Claim daily ETH from the faucet")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
    .addStringOption((option) =>
      option
        .setName("address")
        .setDescription("Type your wallet address")
        .setRequired(true)
    )
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
