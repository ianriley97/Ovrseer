const ytdl = require('ytdl-core');
const request = require('request');

const YTKey = process.env.GOOGLE_KEY;
const Audio = require('./mediaItem.js');
class YouTube {
  constructor(guild) {
    this.Guild = guild;
    this.IsPlaying = false;
    this.Dispatcher;
    this.VoiceChannel;
    this.Queue = [];
    this.SkipsRequested = 0;
    this.Skippers = [];
    this.SkipsRequired = 0;
  }
  RequestPlay(args, type, cb, channel, guildChannel) {
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
  PlayMedia(id, cb) {
    this.VoiceChannel.join().then(connection => {
      var stream = ytdl("https://www.youtube.com/watch?v=" + id, { filter: 'audioonly' });
      this.SkipsRequested = 0;
      this.Skippers = [];
      this.Dispatcher = connection.playStream(stream);
      this.IsPlaying = true;
      this.Dispatcher.on('end', () => {
        this.SkipsRequested = 0;
        this.Skippers = [];
        this.Queue.shift();
        if(this.Queue.length <= 0) {
          this.Dispatcher = null;
          this.IsPlaying = false;
        }
        else setTimeout(() => {
          this.PlayMedia(this.Queue[0].Id);
          cb('**(Now Playing)** ' + this.Queue[0].Info.title);
        }, 500);
      });
    });
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
}

module.exports = YouTube;

function GetId(str, cb) {
  if (IsYoutube(str)) cb(ytdl.getVideoID(str));
  else SearchForVideo(str, (id) => cb(id));
}

function SearchForVideo(query, cb) {
  request("https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=" + encodeURIComponent(query) + "&key=" + YTKey, (error, response, body) => {
    var results = JSON.parse(body);
    if(!results.items[0]) cb("2EynmMH2j4E");
    else cb(results.items[0].id.videoId);
  });
}

function IsYoutube(str) {
    return str.toLowerCase().indexOf("youtube.com") > -1;
}
