const YouTube = require('./youtube.js');

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
  RequestMedia(args, cb, voiceChannel) {
    this.SetVoiceChannel(voiceChannel);
    if (this.VoiceChannel) {
      if (this.Queue.length > 0 || this.IsPlaying) this.AddToQueue(args, 'Queued', cb);
      else {
        this.IsPlaying = true;
        this.AddToQueue(args, 'Now Playing', cb, () => {
          this.PlaySong(this.Queue[0].Stream, cb);
        });
      }
    }
    else cb(" you need to be in a voice channel!");
  }
  AddToQueue(strId, msgState, cb, playfn) {
    this.Queue.push(new YouTube(strId, () => {
      if (playfn) playfn();
      cb(msgState, this.Queue[this.Queue.length-1].GetSongTitle());
    }));
  }
  PlaySong(stream, cb) {
    this.VoiceChannel.join().then((connection) => {
      this.SkipsRequested = 0;
      this.Skippers = [];
      this.Dispatcher = connection.playStream(stream);
      this.IsPlaying = true;
      this.Dispatcher.on('end', (reason) => {
        this.SkipsRequested = 0;
        this.Skippers = [];
        this.Queue.shift();
        if(this.Queue.length <= 0) {
          this.Dispatcher = null;
          this.IsPlaying = false;
        }
        else setTimeout(() => {
          this.PlaySong(this.Queue[0].Stream, cb);
          cb('Now Playing', this.Queue[0].GetSongTitle());
        }, 500);
      });
    });
  }
  RequestSkip(userId, channelMemCount, cb) {
    if(!this.Dispatcher) {
      cb(' there is nothing to skip.');
      return;
    }
    this.SkipsRequired = Math.ceil((channelMemCount - 1) / 2);
    if(this.Skippers.indexOf(userId) == -1) {
      this.Skippers.push(userId);
      this.SkipsRequested += 1;
      if(this.SkipsRequested >= this.SkipsRequired) {
        this.SkipMedia();
        cb(' your skip has been acknowledged. Skipping now!');
      }
      else cb(' your skip has been acknowledged. You need **' + (this.SkipsRequired - this.SkipsRequested) + '** more votes!');
    }
    else cb(' you can\'t vote again.');
  }
  SkipMedia() {
    if(this.Dispatcher) this.Dispatcher.end();
  }
  PauseMedia(cb) {
    if(this.Dispatcher) {
      if(!this.Dispatcher.paused) {
        this.Dispatcher.pause();
        cb(' paused the media player.')
      }
      else cb(' media player already paused.');
    }
    else cb(' no media player to pause.');
  }
  ResumeMedia(cb) {
    if(this.Dispatcher) {
      if(this.Dispatcher.paused) {
        this.Dispatcher.resume();
        cb(' started the media player.')
      }
      else cb(' media player already playing.')
    }
    else cb(' no media player to resume.');
  }
  StopMedia(cb) {
    if(this.Dispatcher) {
      this.ResetPlayer();
      cb(' stopped the media player.');
    }
    else cb(' no media player to stop.');
  }
  ResetPlayer() {
    this.IsPlaying = false;
    this.Queue = [];
    if(this.Dispatcher) this.Dispatcher.end();
    this.VoiceChannel = null;
  }
  GetQueueList() {
    var strList = '';
    var len = this.Queue.length;
    if(len == 0) strList += 'Media queue is empty...';
    for (var i = 0; i < this.Queue.length; i++) {
      var temp = (i + 1) + ': ' + this.Queue[i].GetSongTitle() + (i == 0 ? ' **(Current Track)**' : '') + '\n';
      strList += temp;
    }
    return strList;
  }
}

module.exports = MediaManager;
