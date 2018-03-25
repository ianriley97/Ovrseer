var db;

class DataManager {
  constructor(db) {
    db = db;
  }
  serveData(params, cb) {
    renderReq(params, cb);
  }
}

module.exports = DataManager;

function renderReq(params, cb) {
  if(params) {

  }
  else cb(null, 'An Error Occurred.');
}
