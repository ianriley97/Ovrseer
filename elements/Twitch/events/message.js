module.exports = (app, objs) => {
  var isBot = objs.self;
  if (isBot) return;
  var message = objs.message;
  var channel = app.GetGroup(objs.channel);
  if(!channel) channel = app.AddGroup(, );
  var member = channel.GetMember(objs.userstate.username);
  member.AddExp();
  var prefix = channel.CmdPrefix;
  if (!message.startsWith(prefix)) return;
  let command = message.split(' ')[0].slice(prefix.length);
  let params = message.split(' ').slice(1);
  let cmd = app.GetCommand(command);
  objs.app = app;
  objs.channel = channel;
  objs.member = member;
  if (cmd) cmd.Run.Twitch(message, params, objs);
};
