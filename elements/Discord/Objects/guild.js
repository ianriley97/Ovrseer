const DiscordJS = require('discord.js');
const Log = require('../../../utility/logger.js');

const Member = require('./member.js');

class Guild {
  constructor(guild) {
    this.Guild = guild;
    this.CmdPrefix = process.env.DEFAULT_CMD_PREFIX;
    this.Members = new DiscordJS.Collection();
  }
  SetCmdPrefix(newPrefix) {
    this.CmdPrefix = newPrefix;
  }
  GetMember(member) {
    var foundMember = this.Members.get(member.id);
    if(!foundMember) foundMember = this.AddMember(member);
    return foundMember;
  }
  AddMember(member) {
    var newMember = new Member(member);
    this.Members.set(member.id, newMember);
    Log.default('Member, \"' + member.username + '\" joined guild \"' + this.Guild.name + '\"');
    return newMember;
  }
  RemoveMember(member) {
    this.Members.delete(member.id);
  }
}

module.exports = Guild;
