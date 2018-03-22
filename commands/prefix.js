exports.config = {
  enabled: true,
  aliases: [],
  default: true,
  permLvl: 0
};

exports.help = {
  name: 'prefix',
  description: 'Displays or changes the current prefix.',
  usage: 'prefix , prefix <newprefix>'
};

exports.run = {
  discord: function(cmdParams) {
    var app = cmdParams['app'];
    var message = cmdParams['message'];
    var guild = cmdParams['guild'];
    var params = cmdParams['params'];
    message.reply(getStateStr(guild, params) + "**" + guild.cmd_prefix + "**");
  }
};

function getStateStr(guild, params) {
  var str = "Current prefix is: ";
  if(params.length > 0) {
    guild.setCmdPrefix(params);
    str = "Changed the prefix to: ";
  }
  return str;
}
