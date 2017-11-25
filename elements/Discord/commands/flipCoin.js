exports.Config = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.Help = {
  name: 'flip',
  description: 'Flips a coin for Heads or Tails.',
  usage: 'flip'
};

exports.Run = (app, guild, member, message, params) => {
  message.delete();
  if(params.length == 0) {
    const CoinSide = ['Heads', 'Tails'];
    var side = Math.round(Math.random());
    message.reply(" landed on **" + CoinSide[side] + "**");
  }
}
