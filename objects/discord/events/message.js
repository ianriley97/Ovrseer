module.exports = function(app, args) { // args = [message]
  var client = app.client;
  var message = args[0];
  var appUser = message.author;
  if(appUser.bot) return;
  var channel = message.channel;
  if(channel.type == 'dm') return;
  var appGuild = message.guild;
  app.getUser(appUser, function(user) {
    app.getGuild(appGuild, function(guild) {
      var cmdInfo = app.parseCmd(message.content, guild.cmd_prefix);
      if(cmdInfo) {
        cmdInfo.app = app,
        cmdInfo.user = user;
        cmdInfo.guild = guild;
        cmdInfo.message = message;
        app.runCmd(cmdInfo);
      }
      else {
        app.getBlacklist(guild, function(words) {
          var blacklist = words.concat(app.settings.blacklist);
          app.parseMessage(message.content, blacklist);
        });
      }
    }, appUser);
  });
};
