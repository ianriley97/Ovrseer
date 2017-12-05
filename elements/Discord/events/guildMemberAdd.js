module.exports = (app, objs) => { // args = [member]
  var member = args[0];
  let guild = member.guild;
  app.GetGuild(guild).AddMember(member);
  // guild.defaultChannel.send(`Please welcome ${member.user.username} to the server!`);
};
