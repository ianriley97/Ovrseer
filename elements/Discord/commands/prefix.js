exports.Config = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.Help = {
  name: 'prefix',
  description: 'Displays all the available commands for your permission level.',
  usage: 'help [command]'
};

exports.Run = (app, guild, member, message, params) => {
  var msg = "Current prefix is: **" + guild.CmdPrefix + "**";
  if(params.length > 0) {
    guild.SetCmdPrefix(params[0]);
    msg = "Changed the prefix to **" + params + "**";
  }
  message.reply(msg);
};
