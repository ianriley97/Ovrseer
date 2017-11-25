module.exports = (app, objs) => {
  var member = objs.member;
  let guild = member.guild;
  app.GetGuild(guild).AddMember(member);
  // guild.defaultChannel.send(`Please welcome ${member.user.username} to the server!`);
};
