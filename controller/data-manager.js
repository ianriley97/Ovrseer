class DataManager {
  constructor(db) {
    this.db = db;
  }
  serveData(params, cb) {
    parseReq(params, cb);
  }
}

module.exports = DataManager;

function parseReq(params, cb) {
  if(params) {

  }
  else cb(null, 'An Error Occurred.');
}
