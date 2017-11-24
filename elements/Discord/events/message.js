module.exports = (app, objs) => {
  var message = objs.message;
  var client = app.Client;
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
};
