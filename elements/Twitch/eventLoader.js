const reqEvent = (event, app, objs) => require(`./events/${event}.js`)(app, objs);
var objs = {};
module.exports = (app) => {
  app.Client.on('logon', () => reqEvent('logon', app, objs));
  app.Client.on('part', (channel, username, self) => {
    objs.channel = channel;
    objs.username = username;
    objs.self = self;
    reqEvent('part', app, objs);
  });
  app.Client.on('join', (channel, username, self) => {
    objs.channel = channel;
    objs.username = username;
    objs.self = self;
    reqEvent('join', app, objs);
  });
  app.Client.on('message', (channel, userstate, message, self) => {
    objs.channel = channel;
    objs.userstate = userstate;
    objs.message = message;
    objs.self = self;
    reqEvent('message', app, objs);
  });
};
