const reqEvent = (event, app, objs) => require(`./events/${event}.js`)(app, objs);
var objs = {};
module.exports = (app) => {
  app.Client.on('ready', () => reqEvent('ready', app, objs));
  app.Client.on('reconnecting', () => reqEvent('reconnecting', app, objs));
  app.Client.on('disconnect', () => reqEvent('disconnect', app, objs));
  app.Client.on('message', (message) => {
    objs.message = message;
    reqEvent('message', app, objs);
  });
  app.Client.on('guildMemberAdd', (member) => {
    objs.member = member;
    reqEvent('guildMemberAdd', app, objs);
  });
  app.Client.on('guildMemberRemove', (member) => {
    objs.member = member;
    reqEvent('guildMemberRemove', app, objs);
  });
  // app.Client.on('guildMemberUpdate', (oMember, nMember) => {
  //   objs.oMember = oMember;
  //   objs.nMember = nMember;
  //   reqEvent('guildMemberUpdate', app, objs);
  // });
  app.Client.on('guildBanAdd', (guild, user) => {
    objs.guild = guild;
    objs.user = user;
    reqEvent('guildBanAdd', app, objs);
  });
  app.Client.on('guildBanRemove', (guild, user) => {
    objs.guild = guild;
    objs.user = user;
    reqEvent('guildBanRemove', app, objs);
  });
  app.Client.on('guildCreate', (guild) => {
    objs.guild = guild;
    reqEvent('guildCreate', app, objs);
  });
  app.Client.on('guildDelete', (guild) => {
    objs.guild = guild;
    reqEvent('guildDelete', app, objs);
  });
};
