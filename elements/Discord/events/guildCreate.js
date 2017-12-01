const Log = require('../../../utility/logger.js');

module.exports = (app, args) => { // args = [guild]
  var guild = args[0];
  app.AddGuild(guild);
  Log.Discord(`Guild, "${guild.Object.name}", has been added to Groups.`);
};
