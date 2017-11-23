const Discord = require('discord.js-commando');

class FlipCoinCommand extends Discord.Command {
  constructor(client) {
    super(client, {
      name: 'flip',
      group: 'random',
      memberName: 'flip',
      description: 'Flip a coin.',
      aliases: []
    });
  }

  async run(message, args) {
    message.delete();
    if(args.length == 0) {
      const CoinSide = ['Heads', 'Tails'];
      var side = Math.round(Math.random());
      message.reply(" landed on **" + CoinSide[side] + "**");
    }
  }
}

module.exports = FlipCoinCommand;
