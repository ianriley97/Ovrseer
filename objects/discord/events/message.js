module.exports = function(app, args) { // args = [message]
  var client = app.Client;
  var message = args[0];
  if(message.author.bot) return;
};
