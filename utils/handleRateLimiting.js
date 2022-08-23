// Handles Rate Limiting
// Returns undefined if there is no limit, returns an integer in seconds if there is a limit being applied
const { bypassRoles } = require("../config.json");

// Key - String for the Special Key (ex: network, token,etc)
// Duration - Milliseconds amount (Send from config)
module.exports = async (keyv, interaction, key, duration) => {
  //! Add the commented line to disable ratelimiting for admins
  //* Limited for non Admins
  // if (bypassRoles.some((role) => interaction.member.roles.cache.has(role))) {
  const lastReqTime = await keyv.get(`${interaction.user.id}:${key}`);
  if (lastReqTime) {
    if (Date.now() - lastReqTime < duration) {
      return lastReqTime;
    }
  } else {
    await keyv.set(`${interaction.user.id}:${key}`, Date.now());
    return undefined;
  }
  // }
};
