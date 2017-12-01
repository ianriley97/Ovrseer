module.exports = (app, args) => { // args = [channel, username, self]
  var channel = args[0];
  var username = args[1];
  var botLeft = args[2];
  if(botLeft) app.RemoveChannel(channel);
  else app.GetChannel(channel).RemoveMember(username);
};
