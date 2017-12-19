const Log = require('../../../../utility/logger.js');

module.exports = (app, args) => { // args = [event]
  Log.disconnected(app.Client.user.tag + ' has been disconnected.');
};
