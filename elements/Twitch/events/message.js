// client.on("message", function (channel, userstate, message, self) {
//     // Don't listen to my own messages..
//     if (self) return;
//
//     // Handle different message types..
//     switch(userstate["message-type"]) {
//         case "action":
//             // This is an action message..
//             break;
//         case "chat":
//             // This is a chat message..
//             break;
//         case "whisper":
//             // This is a whisper..
//             break;
//         default:
//             // Something else ?
//             break;
//     }
// });

module.exports = (app, objs) => {
  var isBot = objs.self;
  if (isBot) return;
  var message = objs.message;
  var channel = app.GetChannel(objs.channel);
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
  if (cmd) cmd.Run(message, params, objs);
};
