module.exports = function(app, args) { // args = [event]
  var client = app.client;
  console.log(client.user.tag + ' has been disconnected.');
};
