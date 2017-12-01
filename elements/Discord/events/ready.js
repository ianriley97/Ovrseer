const Log = require('../../../utility/logger.js');

module.exports = (app) => {
  Log.ready('Discord client, ' + app.Client.user.tag + ', is ready.');
};

// module.exports = (app) => {
//   app.Client.on('ready', () => {
//     Log.ready('Discord client, ' + app.Client.user.tag + ', is ready.');
//   });
// }
