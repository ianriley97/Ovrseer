const Log = require('../../../utility/logger.js');

module.exports = (app, args) => { // args = [member]
  var member = args[0];
  let guild = member.guild;
  app.GetGuild(guild).RemoveMember(member);
  Log.Discord(`Member, "${member.Object.username}", has left Guild, "${guild.Object.name}".`);
  // guild.defaultChannel.send(`Please say goodbye to ${member.user.username}. We will miss you!`);
};
