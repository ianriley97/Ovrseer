module.exports = function(app, args) { // args = [message]
  var client = app.Client;
  var message = args[0];
  if(message.author.bot) return;
  var cmd = app.checkForCmdCall(message.content, '>');
  if(cmd) {
    cmd.message = message;
    cmd.member = message.author;
    cmd.guild = message.guild;
    app.runCmd(cmd);
  }
};
