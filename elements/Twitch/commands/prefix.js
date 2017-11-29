exports.Config = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.Help = {
  name: 'prefix',
  description: 'Displays all the available commands for your permission level.',
  usage: 'prefix , prefix <newprefix>'
};

exports.Run = (message, params, objs) => {
  var app = objs.app;
  var channel = objs.channel;
  var msg = "Current prefix is: **" + channel.CmdPrefix + "**";
  if(params.length > 0) {
    channel.SetCmdPrefix(params[0]);
    msg = "Changed the prefix to **" + params + "**";
  }
  app.Client.action(channel.Channel, msg);
};
