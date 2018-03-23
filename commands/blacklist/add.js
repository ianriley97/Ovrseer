exports.config = {
  enabled: true,
  aliases: [],
  default: false,
  permLvl: 0
};

exports.help = {
  name: 'add',
  description: 'Adds to the blacklist of words for this guild.',
  usage: 'add <word 1> <word 2> ... <word N>'
};

exports.run = {
  discord: function(cmdParams) {
    var message = cmdParams['message'];
    var params = cmdParams['params'];
    var guild = cmdParams['guild'];
    if(params.length > 0) {
      var words = params.split(' ');
      guild.addToBlacklist(words);
    }
  }
};
