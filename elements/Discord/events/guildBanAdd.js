module.exports = (app, objs) => {
  var guild = objs.guild;
  var user = objs.user;
  guild.defaultChannel.sendMessage(`${user.username} was just banned!`);
};
