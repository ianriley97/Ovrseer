exports.config = {
  enabled: true,
  aliases: [],
  default: false
};

exports.help = {
  name: 'roll',
  description: 'Rolls a number between 0 and <max> (default 6) or between <min> and <max>. (up to 1,000,000)',
  usage: 'roll , roll <max> , roll <min> <max>'
};

exports.run = {
  discord: function(message, params, objs) {
    var nums = generateNumbers(params);
    if(nums) message.reply(` rolled **${nums.val}**`);
  }
};

function generateNumbers(params) {
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
  var rollVal = Math.floor(Math.random() * (highNum-lowNum+1) + Number.parseInt(lowNum));
  var nums = {};
  nums.val = rollVal;
  nums.low = lowNum;
  nums.high = highNum;
  return nums;
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