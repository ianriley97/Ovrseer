exports.config = {
  enabled: true,
  aliases: [],
  default: false,
  permLvl: 0
};

exports.help = {
  name: 'list',
  description: 'Lists the blacklist of words for this guild.',
  usage: 'list'
};

exports.run = {
  discord: function(cmdParams) {
    var message = cmdParams['message'];
    var params = cmdParams['params'];
    var guild = cmdParams['guild'];
    var blacklist = guild.blacklist;
    var str = `**Blacklist for "${guild.name}":**\n`;
    message.channel.send(str + blacklist.join(', '));
  }
};
