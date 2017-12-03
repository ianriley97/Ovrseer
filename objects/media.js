const MediaItem = require('../mediaItem.js');

class MediaManager {
  constructor() {
    this.VoiceChannel;
    this.IsPlaying = false;
    this.Dispatcher;
    this.Queue = [];
    this.SkipsRequested = 0;
    this.Skippers = [];
    this.SkipsRequired = 0;
  }
  SetVoiceChannel(channel) {
    this.VoiceChannel = channel;
  }
  RequestPlay(requestStr, type, cb, channel, guildChannel) {
    if(type != 'discord') this.VoiceChannel = guildChannel;
    else this.VoiceChannel = channel;
    if (this.VoiceChannel) {
      if (this.Queue.length > 0 || this.IsPlaying) this.AddToQueue(args, 'Queued', cb);
      else {
        this.IsPlaying = true;
        this.AddToQueue(args, 'Now Playing', cb, () => {
          this.PlayMedia(this.Queue[0].Id, cb);
        });
      }
    }
    else cb(" you need to be in a voice channel!");
  }
  AddToQueue(strId, msgState, cb, playfn) {
    GetId(strId, (id) => {
      ytdl.getInfo(('https://www.youtube.com/watch?v='+id), (err, info) => {
        if (err) throw new Error(err);
        this.Queue.push(new Audio(id, info));
        cb('**(' + msgState + ')** ' + info.title);
        if(playfn) playfn();
      });
    });
  }
  GetQueueList() {
    var strList = "```";
    var len = this.Queue.length;
    if(len == 0) strList += 'Media queue is empty...';
    for (var i = 0; i < this.Queue.length; i++) {
      var temp = (i + 1) + ': ' + this.Queue[i].Info.title + (i == 0 ? ' **(Current Track)**' : '') + '\n';
      strList += temp;
    }
    strList += "```";
    return strList;
  }
}

module.exports = MediaManager;
