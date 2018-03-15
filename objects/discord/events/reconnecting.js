module.exports = function(app) {
  var client = app.Client;
  console.log(client.user.tag + ' attempting to reconnect...');
};
