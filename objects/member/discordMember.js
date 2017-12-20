class DiscordMember {
  constructor(member) {
    this.Object = member;
  }
  GetName() {
    return this.Object.username;
  }
}

module.exports = DiscordMember;
