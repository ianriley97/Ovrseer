exports.config = {
  enabled: true,
  aliases: [],
  permLvl: 0
};

exports.help = {
  name: 'prefix',
  description: 'Displays or changes the current prefix.',
  usage: 'prefix , prefix <newprefix>'
};

exports.run = {
  discord: function(params) {
    var guild = objs.guild;
    message.reply(GetStateStr(guild, params) + "**" + guild.CmdPrefix + "**");
  }
};

function GetStateStr(group, params) {
  var str = "Current prefix is: ";
  if(params.length > 0) {
    group.SetCmdPrefix(params[0]);
    str = "Changed the prefix to: ";
  }
  return str;
}
