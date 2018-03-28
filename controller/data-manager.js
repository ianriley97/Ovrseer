const Path = require('path');

const ModelDir = Path.join(__dirname, '..', 'model');
const ServerInfoBlock = require(Path.join(ModelDir, 'server-info-block.js'));
const ServerInfoTab = require(Path.join(ModelDir, 'server-info-tab.js'));

class DataManager {
  constructor(db) {
    this.db = db;
  }
  serve(req, res) {
    var urlArr = req.url.split('/').slice(2);
    if(this.db) this.db.query(getQueryStr(urlArr), function(dbRes) {
      res.writeHead(200, {"Content-Type": "application/json"});
      res.end(convertObjToStr(dbRes.rows));
    });
    else res.end('[Connection Error]');
  }
}

module.exports = DataManager;

function getQueryStr(urlArr) {
  var queryStr = '';
  if(urlArr.length > 0) {
    var table = urlArr[0];
    var col = urlArr[1];
    var id = urlArr[2];
    queryStr += 'SELECT * FROM ' + table;
    if(col && id) queryStr += ' WHERE ' + table + '.' + col + '=' + id;
    queryStr += ';';
  }
  return queryStr;
}

function convertObjToStr(obj) {
  var cache = [];
  var str = JSON.stringify(obj, function(key, value) {
  if (typeof value == 'object' && value) {
    if(cache.indexOf(value) != -1) return;
      cache.push(value);
    }
    return value;
  });
  return str;
}
