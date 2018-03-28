class DatabaseManager {
  constructor(connection, cb, settings) {
    this.settings = settings;
    const {Client} = require('pg');
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
}

module.exports = DatabaseManager;
