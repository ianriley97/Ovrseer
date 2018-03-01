module.exports = function(app, args) { // args = [event]
  var client = app.Client;
  Log('disconnected', client.user.tag + ' has been disconnected.');
};
