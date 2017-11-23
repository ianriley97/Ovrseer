exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['r']
};

exports.help = {
  name: 'reload',
  description: 'Reloads the command file, if it\'s been updated or modified.',
  usage: 'reload <commandname>'
};

exports.run = (app, message, args) => {
  let command;
  if (app.Client.commands.has(args[0])) {
    command = args[0];
  } else if (app.Client.aliases.has(args[0])) {
    command = app.Client.aliases.get(args[0]);
  }
  if (!command) {
    return message.channel.send(`I cannot find the command: ${args[0]}`);
  } else {
    message.channel.send(`Reloading: ${command}`)
      .then(m => {
        app.reload(command)
          .then(() => {
            m.edit(`Successfully reloaded: ${command}`);
          })
          .catch(e => {
            m.edit(`Command reload failed: ${command}\n\`\`\`${e.stack}\`\`\``);
          });
      });
  }
};
