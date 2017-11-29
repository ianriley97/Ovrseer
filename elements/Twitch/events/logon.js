const Log = require('../../../utility/logger.js');

module.exports = (app, objs) => {
  Log.ready('Twitch client, ' + app.Client.username + ', is ready.');
};
