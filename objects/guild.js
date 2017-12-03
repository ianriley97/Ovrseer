const Group = require('./inheritance/group.js');
// const MediaManager = require('../../YouTube/Objects/youtube.js');

class Guild extends Group {
  constructor(guild) {
    super(guild);
    this.ClientVoiceChannel;
    // this.Media = new MediaManager(guild);
  }
  JoinVoiceChannel(channelId, cb) {
    this.Object.channels.forEach(channel => {
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
    // this.Media.ResetPlayer();
  }
  // RequestMedia(args, type, cb, channel) {
  //   this.Media.RequestPlay(args, type, cb, channel, this.ClientVoiceChannel);
  //   this.ClientVoiceChannel = this.Media.VoiceChannel;
  // }
  // GetCurMediaInfo(cb) {
  //
  // }
  // GetQueueList() {
  //   return this.Media.GetQueueList();
  // }
  // RequestSkip(userId, channelMemCount, cb) {
  //   this.Media.RequestSkip(userId, channelMemCount, cb)
  // }
  // PauseMedia(cb) {
  //   this.Media.PauseMedia(cb);
  // }
  // ResumeMedia(cb) {
  //   this.Media.ResumeMedia(cb);
  // }
  // StopMedia(cb) {
  //   this.Media.StopMedia(cb);
  // }
}

module.exports = Guild;
