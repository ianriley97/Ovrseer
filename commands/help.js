const Commands = require('../collections/commands.js');

exports.Config = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.Help = {
  name: 'help',
  description: 'Displays all the available commands for your permission level.',
  usage: 'help <command>'
};

exports.Run = {
  Discord: (message, params, objs) => {
    var app = objs.app;
    var guild = objs.guild;
    message.channel.send(GetMessage(app, params, 'Discord'));
  },
  Twitch: (message, params, objs) => {
    var app = objs.app;
    var channel = objs.channel;
    app.Client.action(channel.Channel, GetMessage(app, params, 'Twitch'));
  }
}

function GetMessage(app, params, group) {
  var msg = '';
  if (!params[0]) {
    Commands.Commands.forEach(cmd => {
      if(cmd.Run[group]) msg += (`**${cmd.Help.name}** :- ${cmd.Help.description}\n`);
    });
  }
  else {
    let cmd = params[0];
    cmd = app.GetCommand(cmd);
    if (cmd && cmd.Run[group]) {
      msg += cmd.Help.name;
    }
  }
  return msg;
}
