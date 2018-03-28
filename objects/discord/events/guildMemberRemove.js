module.exports = function(app, args) { // args = [member]
  var client = app.client;
  var member = args[0];
  app.getUser(member, function(user) {
    app.getGuild(member.guild, function(guild) {
      app.removeGuildMember(guild, user);
    });
  });
};
