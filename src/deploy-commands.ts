//* Run `node deploy-commands.js` to set the commands.
// Run the above command after changing any of the material in the '/commands' folder

import fs from "node:fs";
import path from "node:path";

const assignCommands = require("./utils/assignCommands");

// Get all commands from the `/commands` folder
const commands = [];
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath);

for (const file of commandFiles) {
	const commandPath = path.join(commandsPath, file);
	const command = require(commandPath);
	commands.push(command.data.toJSON());
}
// Pass true to assign commands globally (i.e: assignCommands(commands,true))
assignCommands(commands);
