const Log = require('../../../utility/logger.js');

module.exports = (app, args) => { // args = [channel, username, self]
  var channel = args[0];
  var username = args[1];
  var botLeft = args[2];
  if(botLeft) {
    app.RemoveChannel(channel);
    Log.Discord(`Channel, "${channel}", has been removed from Groups.`);
  }
  else {
    app.GetGroup(channel).RemoveMember(username);
    Log.Discord(`Member, "${username}", has left Channel, "${channel}".`);
  }
};
