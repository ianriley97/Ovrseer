const Commands = require('../collections/commands.js');
const HelpMessage = require('../objects/helpmessage.js');

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
    GetMessage(app, params, app.Identity, (msg) => {
      message.channel.send(`${msg}`);
    }, '**');
  },
  Twitch: (message, params, objs) => {
    var app = objs.app;
    var channel = objs.channel;
    GetMessage(app, params, app.Identity, (msg) => {
      app.Client.action(channel.Channel, `${msg}`);
    }, '');
  }
}

function GetMessage(app, params, group, cb, styleText) {
  var msg = new HelpMessage(styleText);
  if (!params[0]) {
    Commands.Commands.forEach(cmd => {
      if(cmd.Run[group]) {
        if(cmd.Help.group) msg.AddToGroup(cmd.Help.group, `${styleText}${cmd.Help.name}${styleText} :- ${cmd.Help.description}`);
        else msg.AddToOther(`${styleText}${cmd.Help.name}${styleText} :- ${cmd.Help.description}`);
      }
    });
  }
  else {
    let cmd = params[0];
    cmd = app.GetCommand(cmd);
    if (cmd && cmd.Run[group]) {
      msg.AddToOther(`Command: ${styleText}${cmd.Help.name}${styleText}\n\tDescription: ${cmd.Help.description}\n\tUsage: ${cmd.Help.usage}${cmd.Config.aliases.length > 0 ? `\n\tAliases: ${cmd.Config.aliases}` : ``}`);
    }
  }
  cb(msg.GetMessage());
}
