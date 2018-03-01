module.exports = function(app, args) {
  var client = app.Client;
  var defPrefix = process.env.DEFAULT_CMD_PREFIX;
  client.user.setActivity(`${defPrefix}prefix | ${defPrefix}help`);
  Log('ready', 'Discord client, ' + client.user.tag + ', is ready.');
};
