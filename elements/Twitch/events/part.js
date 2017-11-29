module.exports = (app, objs) => {
  var channel = objs.channel;
  var username = objs.username;
  var botLeft = objs.self;
  if(botLeft) app.RemoveChannel(channel);
  else app.GetChannel(channel).RemoveMember(username);
};
