const Collection = require('../collection.js');
const Member = require('../member.js');

class Group {
  constructor(object) {
    this.Object =
    this.CmdPrefix = process.env.DEFAULT_CMD_PREFIX;
    this.Members = new Collection();
  }
  SetCmdPrefix(newPrefix) {
    this.CmdPrefix = newPrefix;
  };
  GetMember(id) {
    var m = this.Members.Get(id);
    return m;
  };
  AddMember(id, member) {
    var m = this.Members.Add(id, new Member(member));
    return m;
  };
  RemoveMember(id) {
    var m = this.Members.Remove(id);
    return m;
  };
}

module.exports = Group;
