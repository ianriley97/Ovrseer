const DiscordJS = require('discord.js');
const Log = require('../../../utility/logger.js');

const Member = require('./member.js');
const MediaManager = require('../../YouTube/Objects/youtube.js');

class Guild {
  constructor(guild) {
    this.Guild = guild;
    this.CmdPrefix = process.env.DEFAULT_CMD_PREFIX;
    this.Members = new DiscordJS.Collection();
    this.ClientVoiceChannel;
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
  JoinVoiceChannel(channelId, cb) {
    this.Guild.channels.forEach(channel => {
      if(channel.id === channelId) {
        this.ClientVoiceChannel = channel;
        return;
      }
    });
    if(this.ClientVoiceChannel) this.ClientVoiceChannel.join();
    else cb(' voice channel does not exist.');
  }
  LeaveVoiceChannel(cb) {
    var channel = this.ClientVoiceChannel;
    if(channel) channel.leave();
    else cb(' client is not in a voice channel.');
    this.ClientVoiceChannel = null;
    this.Media.ResetPlayer();
  }
  RequestMedia(args, type, cb, channel) {
    this.Media.RequestPlay(args, type, cb, channel, this.ClientVoiceChannel);
    this.ClientVoiceChannel = this.Media.VoiceChannel;
  }
  GetCurMediaInfo(cb) {

  }
  GetQueueList() {
    return this.Media.GetQueueList();
  }
  RequestSkip(userId, channelMemCount, cb) {
    this.Media.RequestSkip(userId, channelMemCount, cb)
  }
  PauseMedia(cb) {
    this.Media.PauseMedia(cb);
  }
  ResumeMedia(cb) {
    this.Media.ResumeMedia(cb);
  }
  StopMedia(cb) {
    this.Media.StopMedia(cb);
  }
}

module.exports = Guild;
