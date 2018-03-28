class DatabaseManager {
  constructor(connection, cb) {
    const { Client } = require('pg');
    this.db = new Client({
      connectionString: connection,
      ssl: true
    });
    var dbm = this;
    this.db.connect(function(err) {
      if(err) {
        dbm = null;
        console.error(err);
      }
      else console.log('Database connection successful');
      cb(err, dbm);
    });
  }
  query(queryStr, cb) {
    var dbObj = this;
    this.db.query(queryStr).then(function(res) {
      if(cb) cb(res, dbObj);
    }).catch(function(err) { console.error(err); });
  }
  convertFromArr(arr) {
    var str = '{';
    var length = arr.length;
    for(var i = 0; i < length; i++)
    arr.forEach(function(item) {
      str += item;
      if(i < length - 1) str += ', ';
    });
    str += '}';
    return str;
  }
  convertToArr(str) {
    var arr = JSON.parse("[" + str + "]");
    return arr;
  }
  convertFromObj(obj) {
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
  convertToObj(str) {
    var obj = JSON.parse(str);
    return obj;
  }
}

module.exports = DatabaseManager;
