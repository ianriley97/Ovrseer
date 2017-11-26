const ytdl = require('ytdl-core');
const request = require('request');

const YTKey = process.env.GOOGLE_KEY;
const Audio = require('./mediaItem.js');
class YouTube {
  constructor(guild, defaultChannel) {
    this.Guild = guild;
    this.IsPlaying = false;
    this.Dispatcher;
    this.DefaultVoiceChannel = defaultChannel;
    this.VoiceChannel;
    this.Queue = [];
    this.SkipsRequested = 0;
    this.Skippers = [];
    this.SkipsRequired = 0;
  }
  RequestPlay(args, channel, cb) {
    if (channel || this.VoiceChannel) {
      if(channel != 'twitch') this.VoiceChannel = channel;
      if (this.Queue.length > 0 || this.IsPlaying) this.AddToQueue(args, 'Queued:', cb);
      else {
        this.IsPlaying = true;
        this.AddToQueue(args, 'Now Playing', cb, () => {
          console.log(this.Queue);
          this.PlayMedia(this.Queue[0].Id);
        });
      }
    }
    else cb(" you need to be in a voice channel!");
  }
  PlayMedia(id) {
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
        if(this.Queue.length <= 0) this.IsPlaying = false;
        else setTimeout(() => { this.PlayMedia(this.Queue[0]); }, 500);
      });
    });
  }
  AddToQueue(strId, msgState, cb, playfn) {
    GetId(strId, (id) => {
      ytdl.getInfo(('https://www.youtube.com/watch?v='+id), (err, info) => {
        if (err) throw new Error(err);
        this.Queue.push(new Audio(id, info));
        cb('**(' + msgState + ')** ' + info.title);
      });
    });
  }
  GetQueueList() {
    var strList = "```";
    var len = this.Queue.length;
    if(len == 0) strList += 'EMPTY';
    for (var i = 0; i < this.Queue.length; i++) {
      var temp = (i + 1) + ': ' + this.Queue[i] + (i == 0 ? ' **(Current Track)**' : '') + '\n';
      strList += temp;
    }
    strList += "```";
    return strList;
  }
  RequestSkip(userId, channelMemCount, cb) {
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
    this.Dispatcher.end();
  }
  StopMedia() {
    this.IsPlaying = false;
    this.Queue = [];
    if(this.Dispatcher) this.Dispatcher.end();
    this.Dispatcher = null;
    this.VoiceChannel = null;
  }
}

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

module.exports = YouTube;
