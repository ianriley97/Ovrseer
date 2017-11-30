exports.Config = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.Help = {
  name: 'prefix',
  description: 'Displays or changes the current prefix.',
  usage: 'prefix , prefix <newprefix>'
};

exports.Run = {
  Discord: (message, params, objs) => {
    var guild = objs.guild;
    var msg = "Current prefix is: **" + guild.CmdPrefix + "**";
    if(params.length > 0) {
      guild.SetCmdPrefix(params[0]);
      msg = "Changed the prefix to **" + params + "**";
    }
    message.reply(msg);
  },
  Twitch: (message, params, objs) => {
    var app = objs.app;
    var channel = objs.channel;
    var msg = "Current prefix is: **" + channel.CmdPrefix + "**";
    if(params.length > 0) {
      channel.SetCmdPrefix(params[0]);
      msg = "Changed the prefix to **" + params + "**";
    }
    app.Client.action(channel.Channel, msg);
  }
}
