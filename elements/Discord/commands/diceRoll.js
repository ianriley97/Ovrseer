exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'roll',
  description: 'Rolls a number between 0 and <max> (default 6) or between <min> and <max>.',
  usage: 'roll , roll <max> , roll <min> <max>'
};

exports.run = (app, message, args) => {
  message.delete();
  var lowNum = 1, highNum = 6;
  if(args.length > 0) {
    if(!allNumbers(args) || greaterThanAllowed(args)) return;
    if(args.length == 1) {
      highNum = args[0];
    }
    else if(args.length == 2) {
      lowNum = args[0];
      highNum = args[1];
    }
  }
  var rollVal = Math.floor(Math.random() * (highNum-lowNum+1) + parseInt(lowNum));
  message.reply(" rolled a **" + rollVal + "**  (" + lowNum + "-" + highNum + ")");
}

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
