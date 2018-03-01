module.exports = function(app, args) {
  var client = app.Client;
  Log('disconnected', client.user.tag + ' has been disconnected.');
};
