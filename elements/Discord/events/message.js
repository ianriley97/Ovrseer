module.exports = (app, args) => { // args = [message]
  var message = args[0];
  if (message.author.bot) return;
  var objs = {};
  objs.app = app;
  var g = app.GetGroup(message.guild.id);
  if(!g) g = app.AddGroup(message.guild.id, message.guild);
  else g.UpdateObject(message.guild);
  objs.guild = g;
  var mem = g.GetMember(message.author.id);
  if(!mem) mem = g.AddMember(message.author.id, message.author);
  else mem.UpdateMember(message.author);
  mem.AddExp();
  objs.member = mem;
  var prefix = g.CmdPrefix;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(' ')[0].slice(prefix.length);
  let params = message.content.split(' ').slice(1);
  let cmd = app.GetCommand(command);
  if (cmd && cmd.Run.Discord) cmd.Run.Discord(message, params, objs); // objs = { app, guild, member }
};
