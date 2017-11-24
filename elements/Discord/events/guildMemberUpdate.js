const ddiff = require('return-deep-diff');

module.exports = (app, objs) => {
  var oMember = objs.oMember;
  var nMember = objs.nMember;
  console.log(ddiff(oMember, nMember));
};
