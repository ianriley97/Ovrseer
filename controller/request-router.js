class RequestRouter {
  constructor(vm, dm) {
    this.viewManager = vm;
    this.dataManager = dm;
  }
  buildCaches(cb) {
    this.viewManager.cacheViews();
    setTimeout(cb, 500);
  }
  route(req, cb) {
    switch(req.url) {
      case '/':
        this.viewManager.serveView('home', cb);
        break;
      case '/request':
        this.dataManager.serveData(req['params'], cb);
        break;
    }
  }
}

module.exports = RequestRouter;
