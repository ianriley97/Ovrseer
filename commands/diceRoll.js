exports.Config = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.Help = {
  name: 'roll',
  description: 'Rolls a number between 0 and <max> (default 6) or between <min> and <max>.',
  usage: 'roll , roll <max> , roll <min> <max>'
};

exports.Run = {
  Discord: (message, params, objs) => {
    message.delete();
    var lowNum = 1, highNum = 6;
    if(params.length > 0) {
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
