exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'help',
  description: 'Displays all the available commands for your permission level.',
  usage: 'help [command]'
};

exports.run = (app, message, params) => {
  if (!params[0]) {
    const commandNames = Array.from(app.Client.commands.keys());
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
    message.channel.sendCode('asciidoc', `= Command List =\n\n[Use ${app.CmdPrefix}help <commandname> for details]\n\n${app.Client.commands.map(c => `${app.CmdPrefix}${c.help.name}${' '.repeat(longest - c.help.name.length)} :: ${c.help.description}`).join('\n')}`);
  }
  else {
    let command = params[0];
    if (app.Client.commands.has(command)) {
      command = app.Client.commands.get(command);
      message.channel.sendCode('asciidoc', `= ${command.help.name} = \n${command.help.description}\nusage::${command.help.usage}`);
    }
  }
};
