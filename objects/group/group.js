const Log = require('../../utility/logger.js')

const Collection = require('../collection.js');
const Member = require('../member/member.js');

class Group {
  constructor(object, name, identity) {
    this.Object = object;
    this.Name = name;
    this.Identity = identity;
    this.CmdPrefix = process.env.DEFAULT_CMD_PREFIX;
    this.Members = new Collection();
  };
  UpdateObject(object) {
    this.Object = object;
  };
  SetCmdPrefix(newPrefix) {
    this.CmdPrefix = newPrefix;
  };
  GetMember(id) {
    var m = this.Members.Get(id);
    return m;
  };
  AddMember(id, member) {
    var m = this.Members.Add(id, new Member(member));
    Log[this.Identity](`Member, "${m.Object.username}", has joined ${this.Identity}, "${this.Name}".`);
    return m;
  };
  RemoveMember(id) {
    var m = this.Members.Remove(id);
    Log[this.Identity](`Member, "${m.Object.username}", has joined ${this.Identity}, "${this.Name}".`);
    return m;
  };
}

module.exports = Group;
