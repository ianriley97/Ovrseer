var viewManager;
var dataManager;

class RequestRouter {
  constructor(vm, dm) {
    viewManager = vm;
    dataManager = dm;
  }
  buildCaches(cb) {
    viewManager.cacheViews();
    setTimeout(cb, 500);
  }
  route(req, cb) {
    switch(req.url) {
      case '/':
        viewManager.serveView('home', cb);
        break;
      case '/request':
        dataManager.serveData(req['params'], cb);
        break;
    }
  }
}

module.exports = RequestRouter;
