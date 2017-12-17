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
  var def = false;
  if (!message.content.startsWith(prefix)) {
    prefix = process.env.DEFAULT_CMD_PREFIX;
    if (!message.content.startsWith(process.env.DEFAULT_CMD_PREFIX)) return;
    def = true;
  }
  let command = message.content.split(' ')[0].slice(prefix.length);
  let params = message.content.split(' ').slice(1);
  let cmd = app.GetCommand(command);
  if (def && !cmd.Config.default) return;
  if (cmd && cmd.Run.Discord) cmd.Run.Discord(message, params, objs); // objs = { app, guild, member }
};
