const Log = require('../../../utility/logger.js');

module.exports = (app, objs) => {
  Log.ready('Discord client, ' + app.Client.user.tag + ', is ready.');
};
