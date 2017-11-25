const Log = require('../../../utility/logger.js');

module.exports = (app, objs) => {
  Log.ready(app.Client.user.tag + ' is ready.');
};
