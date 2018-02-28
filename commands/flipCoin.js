exports.config = {
  enabled: true,
  aliases: []
};

exports.help = {
  name: 'flip',
  description: 'Flips a coin for Heads or Tails.',
  usage: 'flip'
};

exports.run = {
  Discord: (message, params, objs) => {
    message.delete();
    if(params.length == 0) {
      const CoinSide = ['Heads', 'Tails'];
      var side = Math.round(Math.random());
      message.reply(" landed on **" + CoinSide[side] + "**");
    }
  }
}
