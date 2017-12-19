const Member = require('./member.js');

class DiscordMember extends Member {
  constructor(member) {
    super(member);
  }
  GetName() {
    return this.Object.username;
  }
}

module.exports = DiscordMember;
