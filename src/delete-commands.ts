//! Run `node delete-commands.js` to delete all the commands

const deleteCommands = require("./utils/deleteCommands");

// Pass true to remove all commands globally (i.e : deleteCommands(true))
deleteCommands(true);
