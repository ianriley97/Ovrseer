exports.Config = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.Help = {
  name: 'help',
  description: 'Displays all the available commands for your permission level.',
  usage: 'help [command]'
};

exports.Run = (app, guild, member, message, params) => {
  if (!params[0]) {
    const commandNames = Array.from(app.Commands.keys());
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
    message.channel.send(`= Command List =\n\n[Use ${guild.CmdPrefix}help <commandname> for details]\n\n${app.Commands.map(c => `${guild.CmdPrefix}${c.Help.name}${' '.repeat(longest - c.Help.name.length)} :: ${c.Help.description}`).join('\n')}`, {code:'asciidoc'});
  }
  else {
    let cmd = params[0];
    cmd = app.GetCommand(cmd);
    if (cmd) {
      message.channel.send(`= ${cmd.Help.name} = \n${cmd.Help.description}\nusage::${cmd.Help.usage}`, {code:'asciidoc'});
    }
  }
};
