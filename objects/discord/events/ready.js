module.exports = function(app) {
  var client = app.Client;
  client.user.setActivity('>prefix | >help');
  console.log('Discord client, ' + client.user.tag + ', is ready.');
};