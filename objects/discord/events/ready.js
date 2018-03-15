module.exports = function(app) {
  var client = app.Client;
  var defPrefix = process.env.DEFAULT_CMD_PREFIX;
  client.user.setActivity(`${defPrefix}prefix | ${defPrefix}help`);
  console.log('Discord client, ' + client.user.tag + ', is ready.');
};
