const Log = require('../../../utility/logger.js');

module.exports = (app, objs) => {
  Log.reconnecting(app.Client.user.tag + ' attempting to reconnect...');
};
