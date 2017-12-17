const Log = require('../../../utility/logger.js');

module.exports = (app) => {
  var defPrefix = process.env.DEFAULT_CMD_PREFIX;
  app.Client.user.setGame(`${defPrefix}prefix | ${defPrefix}help`);
  Log.ready('Discord client, ' + app.Client.user.tag + ', is ready.');
};
