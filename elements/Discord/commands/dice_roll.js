const Discord = require('discord.js-commando');

class DiceRollCommand extends Discord.Command {
  constructor(client) {
    super(client, {
      name: 'roll',
      group: 'random',
      memberName: 'roll',
      description: 'Rolls a die.',
      aliases: []
    });
  }

  async run(message, args) {
    message.delete();
    var lowNum = 1, highNum = 6;
    if(args.length > 0) {
      var params = args.split(' ');
      if(!allNumbers(params) || greaterThanAllowed(params)) return;
      if(params.length == 1) {
        highNum = params[0];
      }
      else if(params.length == 2) {
        lowNum = params[0];
        highNum = params[1];
      }
    }
    var rollVal = Math.floor(Math.random() * (highNum-lowNum+1) + parseInt(lowNum));
    message.reply(" rolled a **" + rollVal + "**  (" + lowNum + "-" + highNum + ")");
  }
}

module.exports = DiceRollCommand;

function greaterThanAllowed(arr) {
  for(var i in arr) {
    if(arr[i] > 1000000) return true;
  }
  return false;
}

function allNumbers(arr) {
  for(var i in arr) {
    if(isNaN(arr[i])) return false;
  }
  return true;
}
