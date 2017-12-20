const Twitch = require('../../app.js').TwitchApp;
const TwitchChannels = require('../../objects/twitchChannels.js');

exports.Config = {
  enabled: true,
  default: false,
  aliases: []
};

exports.Help = {
  name: 'channels',
  description: 'Shows the Twitch channels the bot is connected to.',
  usage: 'channels'
};

exports.Run = {
  Discord: (message, params, objs) => {
    var app = objs.app;
    var guild = objs.guild;
    var member = objs.member;
    var msg = '';
    TwitchChannels.Channels.forEach((ch) => {
      msg += `https://www.twitch.tv/${ch[0].slice(1)} \n`;
    });
    if(msg.length <= 0) msg = 'There are no connected channels.';
    message.channel.send(`\`\`\`${msg}\`\`\``);
  }
};
