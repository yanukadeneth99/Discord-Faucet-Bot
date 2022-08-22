//* Run `node deploy-commands.js` to set the commands.
// Run the above command after changing any of the material in the '/commands' folder

const fs = require("node:fs");
const path = require("node:path");
const assignCommands = require("./utils/assignCommands");

try {
  // Get all commands from the `/commands` folder
  const commands = [];
  const commandsPath = path.join(__dirname, "commands");
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const commandPath = path.join(commandsPath, file);
    const command = require(commandPath);
    commands.push(command.data.toJSON());
  }
  // Pass true to assign commands globally (i.e: assignCommands(commands,true))
  assignCommands(commands);
} catch (error) {
  console.error(`Error pushing commands in deploy-commands : ${error}`);
  throw new Error(error);
}
