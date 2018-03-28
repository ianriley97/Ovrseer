module.exports = function(app) {
  var client = app.client;
  var defPrefix = app.commands.defCmdPrefix;
  client.user.setActivity(`${defPrefix}prefix | ${defPrefix}help`);
  console.log('Discord client, ' + client.user.tag + ', is ready.');
  app.updateDbClient(client);
};
