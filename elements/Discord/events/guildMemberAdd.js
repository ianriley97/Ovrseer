const Log = require('../../../utility/logger.js');

module.exports = (app, objs) => { // args = [member]
  var member = args[0];
  let guild = member.guild;
  app.GetGuild(guild).AddMember(member);
  Log.Discord(`Member, "${member.Object.username}", has joined Guild, "${guild.Object.name}".`);
  // guild.defaultChannel.send(`Please welcome ${member.user.username} to the server!`);
};
