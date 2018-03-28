module.exports = function(app, args) { // args = [guild]
  var client = app.client;
  var guild = args[0];
  app.addGuild(guild);
  var channels = guild.channels;
  channels.forEach(function(ch) {
    if(ch.type == 'text') {
      ch.send(`
        Hello @everyone , and thanks for letting me join your guild!\n
        **-This is just a notice-**\n
        ${app.settings.app_purpose_notice_msg}
      `);
    }
    app.updateDbClient(client);
  });
};
