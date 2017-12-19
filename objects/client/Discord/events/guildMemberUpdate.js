// const ddiff = require('return-deep-diff');

module.exports = (app, args) => { // args = [oldMember, newMember]
  var oMember = args[0];
  var nMember = args[1];
  var guild = oMember.guild;
  var member = guild.GetMember(oMember.id);
  member.UpdateMember(nMember);
};
