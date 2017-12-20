class TwitchMember {
  constructor(member) {
    this.Object = member;
  }
  GetName() {
    return this.Object.username;
  }
}

module.exports = TwitchMember;
