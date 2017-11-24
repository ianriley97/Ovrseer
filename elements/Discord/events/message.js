module.exports = (app, objs) => {
  var message = objs.message;
  if (message.author.bot) return;
  var client = app.Client;
  var guild = app.GetGuild(message.guild);
  if(!guild) guild = app.AddGuild(message.guild);
  var prefix = guild.CmdPrefix;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(' ')[0].slice(prefix.length);
  let params = message.content.split(' ').slice(1);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  }
  else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    cmd.run(app, guild, message, params);
  }
};
