module.exports = function(app, args) { // args = [member]
  var client = app.client;
  var member = args[0];
  app.getUser(member, function(user) {
    app.getGuild(message.guild, function(guild) {
      member.send(`
        Hello and Welcome to "${guild.name}"!\n
        **-This is just a notice-**\n
        ${app.settings.app_purpose_notice_msg}
      `);
    }, user);
  });
};
