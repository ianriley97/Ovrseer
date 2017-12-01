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
    message.reply(GetStateStr(params) + "**" + guild.CmdPrefix + "**");
  },
  Twitch: (message, params, objs) => {
    var app = objs.app;
    var channel = objs.channel;
    app.Client.action(channel.Object, GetStateStr(params) + channel.CmdPrefix);
  }
}

function GetStateStr(params) {
  var str = "Current prefix is: ";
  if(params.length > 0) {
    channel.SetCmdPrefix(params[0]);
    str = "Changed the prefix to: ";
  }
  return str;
}
