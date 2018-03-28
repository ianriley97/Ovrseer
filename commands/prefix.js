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
    if(params.length > 0) app.updateCmdPrefix(guild, params);
    else message.reply(` current prefix is **${guild.cmd_prefix}**`);
  }
};
