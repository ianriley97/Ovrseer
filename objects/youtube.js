const ytdl = require('ytdl-core');
const request = require('request');

const YTKey = process.env.GOOGLE_KEY;

class YouTube {
  constructor() {
    this.SongInfo;
  }
  RequestSong(strId, cb) {
    var stream;
    GetId(strId, (id) => {
      ytdl.getInfo(('https://www.youtube.com/watch?v='+id), (err, info) => {
        if (err) throw new Error(err);
        this.SongInfo = info;
        stream = ytdl("https://www.youtube.com/watch?v=" + id, { filter: 'audioonly' });
      });
    });
    cb(stream);
  }
  GetSongInfo() {
    return this.SongInfo;
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
