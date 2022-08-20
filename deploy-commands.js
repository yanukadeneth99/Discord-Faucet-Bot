const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
require("dotenv").config({ path: ".env" });

const commands = [];
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken(process.env.DCB_TOKEN);

rest
  .put(
    Routes.applicationGuildCommands(
      process.env.DCB_CLIENT_ID,
      process.env.DCB_GUILD_ID
    ), //* Use for Production
    //Routes.applicationCommands(process.env.DBC_CLIENT_ID) //* Use for Development as its updated instantly (no cache)
    { body: commands }
  )
  .then(() => console.log("Successfully registered application commands"))
  .catch(console.error);
