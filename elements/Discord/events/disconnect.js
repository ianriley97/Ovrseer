const Log = require('../../../utility/logger.js');

module.exports = (app, objs) => {
  Log.disconnected(app.Client.user.tag + ' has been disconnected.');
};
