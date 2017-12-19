const Group = require('./group.js');
const MediaManager = require('../media/mediaManager.js');

class Guild extends Group {
  constructor(guild) {
    super(guild, guild.name, "Guild");
    this.ClientVoiceChannel;
    this.Media = new MediaManager();
  }
  JoinVoiceChannel(channelId, cb) {
    this.Object.channels.forEach(channel => {
      if(channel.id == channelId || channel.name == channelId) {
        this.ClientVoiceChannel = channel;
        return;
      }
    });
    if(this.ClientVoiceChannel) this.ClientVoiceChannel.join();
    else cb(' voice channel does not exist.');
  }
  LeaveVoiceChannel(cb) {
    if (this.ClientVoiceChannel) this.ClientVoiceChannel.leave();
    else cb(' client is not in a voice channel.');
    this.ClientVoiceChannel = null;
    this.Media.ResetPlayer();
  }
  RequestMedia(args, cb, channel) {
    this.Media.RequestMedia(args, cb, channel);
    this.ClientVoiceChannel = this.Media.VoiceChannel;
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
