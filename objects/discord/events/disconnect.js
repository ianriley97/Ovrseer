module.exports = function(app, args) { // args = [event]
  var client = app.Client;
  console.log(client.user.tag + ' has been disconnected.');
};
