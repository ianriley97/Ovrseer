exports.config = {
  enabled: true,
  aliases: [],
  permLvl: 0
};

exports.help = {
  name: 'roll',
  description: 'Rolls a number between, and including 1 and <max> (default 6) or between <min> and <max>.',
  usage: 'roll , roll <max> , roll <min/max> <max/min>'
};

exports.run = {
  discord: function(cmdParams) {
    var message = cmdParams['message'];
    var params = cmdParams['params'];
    var lowNum = 1, highNum = 6;
    if(params.length > 0) {
      var paramArr = params.split(' ', 2).map(Number);
      if(paramArr.length == 1) highNum = paramArr[0];
      else {
        lowNum = Math.min(paramArr[0], paramArr[1]);
        highNum = Math.max(paramArr[0], paramArr[1]);
      }
    }
    var rollVal = Math.floor(Math.random() * (highNum-lowNum+1) + lowNum);
    message.reply(' rolled **' + rollVal + '**');
  }
};
