const Commands = require('../collections/commands.js');

exports.Config = {
  enabled: true,
  default: true,
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
    GetMessage(app, params, app.Identity, '**', (msg) => {
      message.channel.send(`${msg}`);
    });
  },
  Twitch: (message, params, objs) => {
    var app = objs.app;
    var channel = objs.channel;
    GetMessage(app, params, app.Identity, '', (msg) => {
      app.Client.action(channel.Channel, `${msg}`);
    });
  }
}

function GetMessage(app, params, group, styleText, cb) {
  var msg = '';
  var msgCount = 0;
  if (!params[0]) {
    Commands.Groups.forEach((g) => {
      msg += (`${styleText}- ${g} -${styleText}\n`);
      msgCount = msg.length;
      Commands[g].forEach((cmd) => {
        if(cmd.Run[group]) msg += (`\t${styleText}${cmd.Help.name}${styleText} :- ${cmd.Help.description}\n`);
      });
      msg += '\n';
      if(msg.length > msgCount) msg.replace(`${g}\n\n`, '');
    });
    Commands.Commands.forEach((cmd) => {
      if(cmd.Run[group]) msg += (`${styleText}${cmd.Help.name}${styleText} :- ${cmd.Help.description}\n`);
    });
  }
  else {
    let command = params[0];
    var cmdGroup;
    if(Commands.IsGroup(command)) {
      cmdGroup = command;
      params = params.slice(1);
      command = params[0];
    }
    let cmd = app.GetCommand(command, cmdGroup);
    if (cmd && cmd.Run[group]) {
      msg += (`Command: ${styleText}${cmd.Help.name}${styleText}\n\tDescription: ${cmd.Help.description}\n\tUsage: ${cmd.Help.usage}${cmd.Config.aliases.length > 0 ? `\n\tAliases: ${cmd.Config.aliases}` : ``}`);
    }
  }
  cb(msg.trim());
}
