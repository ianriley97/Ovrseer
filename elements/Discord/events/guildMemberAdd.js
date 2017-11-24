module.exports = (app, objs) => {
  var member = objs.member;
  let guild = member.guild;
  guild.defaultChannel.sendMessage(`Please welcome ${member.user.username} to the server!`);
};
