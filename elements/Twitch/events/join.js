module.exports = (app, objs) => {
  var channel = objs.channel;
  var username = objs.username;
  var botJoined = objs.self;
  if(botJoined) app.AddChannel(channel);
  else app.GetChannel(channel).AddMember(username);
};
