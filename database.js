class DatabaseManager {
  constructor(connection) {
    const {Client} = require('pg');
    this.db = new Client({
      connectionString: connection,
      ssl: true
    });
    this.db.connect(function(err) {
      if(err) console.log(err);
      else console.log('Database connection successful');
    });
  }
}

module.exports = DatabaseManager;

function convert(item) {
  var res = item.rows;
  if(res.length == 0) return null;
  res = res[0];
  return res;
}
