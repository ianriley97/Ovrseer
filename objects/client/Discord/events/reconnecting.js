const Log = require('../../../../utility/logger.js');

module.exports = (app) => {
  Log.reconnecting(app.Client.user.tag + ' attempting to reconnect...');
};
