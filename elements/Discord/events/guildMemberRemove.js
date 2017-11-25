module.exports = (app, objs) => {
  var member = objs.member;
  let guild = member.guild;
  app.GetGuild(guild).RemoveMember(member);
  // guild.defaultChannel.send(`Please say goodbye to ${member.user.username}. We will miss you!`);
};
