const Log = require('../../../utility/logger.js');

const Member = require('../../Objects/member.js');

class Channel {
  constructor(channel) {
    this.Channel = channel;
    this.CmdPrefix = process.env.DEFAULT_CMD_PREFIX;
    this.Members = new Map();
  }
  SetCmdPrefix(newPrefix) {
    this.CmdPrefix = newPrefix;
  }
  GetMember(member) {
    var foundMember = this.Members.get(member);
    if(!foundMember) foundMember = this.AddMember(member);
    return foundMember;
  }
  AddMember(member) {
    var newMember = new Member(member);
    this.Members.set(member, newMember);
    Log.default('Member, \"' + member + '\" joined channel \"' + this.Channel + '\"');
    return newMember;
  }
  RemoveMember(member) {
    this.Members.delete(member);
    Log.default('Member, \"' + member + '\" left channel \"' + this.Channel + '\"');
  }
}

module.exports = Channel;
