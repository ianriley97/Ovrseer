exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'prefix',
  description: 'Displays all the available commands for your permission level.',
  usage: 'help [command]'
};

exports.run = (app, guild, message, params) => {
  var msg = "Current prefix is: **" + guild.CmdPrefix + "**";
  if(params.length > 0) {
    guild.SetCmdPrefix(params[0]);
    msg = "Changed the prefix to **" + params + "**";
  }
  message.reply(msg);
};
