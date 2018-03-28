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
    var app = cmdParams['app'];
    var guild = cmdParams['guild'];
    var message = cmdParams['message'];
    var globalBlacklist = app.settings.blacklist;
    app.getBlacklist(guild, function(blacklist) {
      var msg = `**Global Blacklist:**\n${globalBlacklist.join(', ')}\n\n**Blacklist for "${guild.name}":**\n${blacklist.join(', ')}`;
      message.channel.send(msg);
    });
  }
};
