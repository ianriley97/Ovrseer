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

exports.run = (app, message, params) => {
  let command;
  if (app.Client.commands.has(params[0])) {
    command = params[0];
  } else if (app.Client.aliases.has(params[0])) {
    command = app.Client.aliases.get(params[0]);
  }
  if (!command) {
    return message.channel.send(`I cannot find the command: ${params[0]}`);
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
