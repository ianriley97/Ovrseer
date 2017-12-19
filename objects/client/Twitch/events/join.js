module.exports = (app, args) => { // args = [channel, username, self]
  var channel = args[0];
  var username = args[1];
  var botJoined = args[2];
  if(botJoined) app.AddGroup(channel, channel);
  else app.GetGroup(channel).AddMember(username);
};
