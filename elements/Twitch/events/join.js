const Log = require('../../../utility/logger.js');

module.exports = (app, args) => { // args = [channel, username, self]
  var channel = args[0];
  var username = args[1];
  var botJoined = args[2];
  if(botJoined) {
    app.AddGroup(channel, channel);
    Log.Twitch(`Channel, "${channel}", has been added to Groups.`)
  }
  else {
    app.GetGroup(channel).AddMember(username);
    Log.Twitch(`Member, "${username}", has been added to Channel, "${channel}".`);
  }
};
