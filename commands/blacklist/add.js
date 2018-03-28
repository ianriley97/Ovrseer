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
    var app = cmdParams['app'];
    var guild = cmdParams['guild'];
    var params = cmdParams['params'];
    if(params.length > 0) {
      var words = params.split(' ');
      app.addToBlacklist(guild, words);
    }
  }
};
