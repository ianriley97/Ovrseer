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
      var rows = res.rows;
      res.end(rows);
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
