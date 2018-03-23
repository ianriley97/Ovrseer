module.exports = function(app, args) { // args = [message]
  var client = app.client;
  var message = args[0];
  if(message.author.bot) return;
  var channel = message.channel;
  if(channel.type == 'dm') return;
  app.getUser(message.author, function(user) {
    app.getGuild(message.guild, function(guild) {
      var cmd = app.checkForCmd(message.content, guild.cmd_prefix);
      if(cmd) {
        cmd.app = app,
        cmd.message = message;
        cmd.guild = guild;
        cmd.user = user;
        app.runCmd(cmd);
      }
      else app.parseMessage(message.content, guild.blacklist);
    }, user);
  });
};
