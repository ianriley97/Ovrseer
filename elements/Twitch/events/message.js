const Log = require('../../../utility/logger.js');

module.exports = (app, args) => { // args = [channel, userstate, message, self]
  var isBot = args[3];
  if (isBot) return;
  var channel = args[0];
  var userstate = args[1];
  var message = args[2];
  var objs = {};
  objs.app = app;
  var ch = app.GetGroup(channel);
  if(!ch) {
    ch = app.AddGroup(channel, channel);
    Log.Twitch(`Channel, "${channel}", has been added to Groups.`);
  }
  else ch.UpdateObject(channel);
  objs.channel = ch;
  var mem = ch.GetMember(userstate.username);
  if(!mem) {
    mem = ch.AddMember(userstate.username, userstate);
    Log.Twitch(`Member, "${userstate.username}", has joined Channel, "${channel}".`);
  }
  else mem.UpdateMember(userstate);
  mem.AddExp();
  objs.member = mem;
  var prefix = ch.CmdPrefix;
  if (!message.startsWith(prefix)) return;
  let command = message.split(' ')[0].slice(prefix.length);
  let params = message.split(' ').slice(1);
  let cmd = app.GetCommand(command);
  // objs => app, channel, message
  if (cmd && cmd.Run.Twitch) cmd.Run.Twitch(message, params, objs); // objs = { app, channel, member }
};
