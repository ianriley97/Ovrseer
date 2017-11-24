module.exports = (app, objs) => {
  var member = objs.member;
  let guild = member.guild;
  guild.defaultChannel.sendMessage(`Please say goodbye to ${member.user.username} we will miss you!`);
};
