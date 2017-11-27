module.exports = (app, objs) => {
  var message = objs.message;
  if (message.author.bot) return;
  var guild = app.GetGuild(message.guild);
  var member = guild.GetMember(message.author);
  member.AddExp();
  var prefix = guild.CmdPrefix;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(' ')[0].slice(prefix.length);
  let params = message.content.split(' ').slice(1);
  let cmd = app.GetCommand(command);
  objs.app = app;
  objs.guild = guild;
  objs.member = member;
  if (cmd) cmd.Run(message, params, objs);
};
