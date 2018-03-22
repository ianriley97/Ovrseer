exports.config = {
  enabled: true,
  aliases: [],
  default: false,
  permLvl: 0
};

exports.help = {
  name: 'flip',
  description: 'Flips a coin for Heads or Tails.',
  usage: 'flip'
};

exports.run = {
  discord: function(cmdParams) {
    var message = cmdParams['message'];
    var params = cmdParams['params'];
    if(params.length == 0) {
      const CoinSide = ['Heads', 'Tails'];
      var side = Math.round(Math.random());
      message.reply(" landed on **" + CoinSide[side] + "**");
    }
  }
};
