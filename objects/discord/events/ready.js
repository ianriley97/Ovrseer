module.exports = function(app) {
  var client = app.client;
  client.user.setActivity(`${app.settings.cmd_prefix}prefix | ${app.settings.cmd_prefix}help`);
  console.log('Discord client, ' + client.user.tag + ', is ready.');
};
