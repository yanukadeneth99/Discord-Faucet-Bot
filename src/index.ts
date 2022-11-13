// Starting Point of the project : run `node .`
import { Collection } from "discord.js";
import * as dotenv from "dotenv";
import Keyv from "keyv";
import fs from "node:fs";
import path from "node:path";

import client from "./client"; // Get Client
dotenv.config();

// KeyV Creation and Handling
const keyv = new Keyv();
keyv.on("error", (err?: Error) => {
	console.error("Keyv connection error:", err.message);
	throw new Error("Error KEYV: " + err.message);
});

// TODO Create Database Connection here

// Run the Events
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs.readdirSync(eventsPath);

for (const file of eventFiles) {
	const ePath = path.join(eventsPath, file);
	const event = require(ePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.dname, (...args) => event.execute(keyv, client, ...args));
	}
}

// Gets all command files, and sets them

client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath);

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	//Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

// Login to Bot with token
try {
	client.login(process.env.BOT_TOKEN);
} catch (error) {
	console.error(`Error login to BOT at index : ${error}`);
}
