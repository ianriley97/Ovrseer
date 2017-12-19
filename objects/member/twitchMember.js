const Member = require('./member.js');

class TwitchMember extends Member {
  constructor(member) {
    super(member);
  }
  GetName() {
    return this.Object.username;
  }
}

module.exports = TwitchMember;
