module.exports = function(app, args) { // args = [message]
  var client = app.client;
  var message = args[0];
  if(message.author.bot) return;
  app.getGuild(message.guild, function(guild) {
    app.getMember(message.author, function(member) {
      var cmd = app.checkForCmd(message.content, guild.cmd_prefix);
      if(cmd) {
        cmd.app = app,
        cmd.message = message;
        cmd.guild = guild;
        cmd.member = member;
        app.runCmd(cmd);
      }
      else app.parseMessage(message.content, null);
    });
  });
};
