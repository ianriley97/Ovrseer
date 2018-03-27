const ViewDirects = new Map([
  ['/', 'home']
]);

class RequestRouter {
  constructor(vm, dm) {
    this.viewManager = vm;
    this.dataManager = dm;
  }
  buildCaches(cb) {
    this.viewManager.cacheViews();
    setTimeout(cb, 500);
  }
  get(req, res) {
    if(req.url.includes('/request')) this.dataManager.serve(req, res);
    else {
      req.view = ViewDirects.get(req.url);
      this.viewManager.serve(req, res);
    }
  }
  post(req, res) {

  }
}

module.exports = RequestRouter;
