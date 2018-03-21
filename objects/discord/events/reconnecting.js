module.exports = function(app) {
  var client = app.client;
  console.log(client.user.tag + ' attempting to reconnect...');
};
