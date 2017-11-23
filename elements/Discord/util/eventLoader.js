const reqEvent = (event) => require(`../events/${event}.js`)
module.exports = app => {
  app.Client.on('ready', () => reqEvent('ready')(app));
  app.Client.on('reconnecting', () => reqEvent('reconnecting')(app));
  app.Client.on('disconnect', () => reqEvent('disconnect')(app));
  // app.Client.on('message', reqEvent('message'));
  app.Client.on('guildMemberAdd', reqEvent('guildMemberAdd'));
  app.Client.on('guildMemberRemove', reqEvent('guildMemberRemove'));
  app.Client.on('guildMemberUpdate', reqEvent('guildMemberUpdate'));
  app.Client.on('guildBanAdd', reqEvent('guildBanAdd'));
  app.Client.on('guildBanRemove', reqEvent('guildBanRemove'));
};
