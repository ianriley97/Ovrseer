module.exports = (app, objs) => {
  var message = objs.message;
  if (message.author.bot) return;
  var guild = app.GetGuild(message.guild);
  guild.GetMember(message.author).AddExp();
  var prefix = guild.CmdPrefix;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(' ')[0].slice(prefix.length);
  let params = message.content.split(' ').slice(1);
  let cmd = app.GetCommand(command);
  if (cmd) cmd.Run(app, guild, message, params);
};
