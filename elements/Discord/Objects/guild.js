const DiscordJS = require('discord.js');
const Log = require('../../../utility/logger.js');

const Member = require('./member.js');
const MediaManager = require('../../YouTube/Objects/youtube.js');

class Guild {
  constructor(guild) {
    this.Guild = guild;
    this.CmdPrefix = process.env.DEFAULT_CMD_PREFIX;
    this.Members = new DiscordJS.Collection();
    this.Media = new MediaManager(guild);
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
  RequestMedia(args, channel, cb) {
    this.Media.RequestPlay(args, channel, cb);
  }
  GetQueueList() {
    return this.Media.GetQueueList();
  }
  RequestSkip(userId, channelMemCount, cb) {
    this.Media.RequestSkip(userId, channelMemCount, cb)
  }
  StopMedia() {
    this.Media.Stop();
  }
}

module.exports = Guild;
