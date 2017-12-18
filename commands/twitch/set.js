const Twitch = require('../../app.js').TwitchApp;

exports.Config = {
  enabled: true,
  default: false,
  aliases: []
};

exports.Help = {
  name: 'set',
  description: 'Sets and joins a Twitch channel (preferably your own) to your member account.',
  usage: 'set <twitchusername>'
};

exports.Run = {
  Discord: (message, params, objs) => {
    var app = objs.app;
    var guild = objs.guild;
    var member = objs.member;
    params = params.join(' ');
    Twitch.Client.join(params).then((data) => {
      member.TwitchAccount = data;
      message.reply(`${app.Client.user.username} was successful in joining Twitch channel, ${data}.`);
    }).catch((err) => {
      console.log(err);
      message.reply(`${app.Client.user.username} was unable to join Twitch channel, ${params}.`);
    });
  }
};
