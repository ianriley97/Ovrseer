const Log = require('../../../utility/logger.js');

module.exports = (app, objs) => { // args = [guild]
  var guild = args[0];
  app.RemoveGuild(guild);
  Log.Discord(`Guild, "${guild.Object.name}", has been removed from Groups.`);
};
