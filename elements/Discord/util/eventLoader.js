const reqEvent = (event) => require(`../events/${event}.js`);
module.exports = app => {
  app.Client.on('ready', () => reqEvent('ready')(app));
  // app.Client.on('reconnecting', () => reqEvent('reconnecting')(app));
  // app.Client.on('disconnect', () => reqEvent('disconnect')(app));
  app.Client.on('message', message => {
    let client = message.client;
    if (message.author.bot) return;
    if (!message.content.startsWith(app.CmdPrefix)) return;
    let command = message.content.split(' ')[0].slice(app.CmdPrefix.length);
    let params = message.content.split(' ').slice(1);
    let cmd;
    if (client.commands.has(command)) {
      cmd = client.commands.get(command);
    }
    else if (client.aliases.has(command)) {
      cmd = client.commands.get(client.aliases.get(command));
    }
    if (cmd) {
      cmd.run(app, message, params);
    }
  });
  // app.Client.on('guildMemberAdd', reqEvent('guildMemberAdd'));
  // app.Client.on('guildMemberRemove', reqEvent('guildMemberRemove'));
  // app.Client.on('guildMemberUpdate', reqEvent('guildMemberUpdate'));
  // app.Client.on('guildBanAdd', reqEvent('guildBanAdd'));
  // app.Client.on('guildBanRemove', reqEvent('guildBanRemove'));
};
