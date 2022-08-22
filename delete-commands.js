//! Run `node delete-commands.js` to delete all the commands

const deleteCommands = require("./utils/deleteCommands");

try {
  // Pass true to remove all commands globally (i.e : deleteCommands(true))
  deleteCommands();
} catch (error) {
  console.error(`Error deleting commands in delete-commands : ${error}`);
  throw new Error(error);
}
