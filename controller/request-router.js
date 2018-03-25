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
  route(req, sendRes) {
    switch(req.url) {
      case '/':
        viewManager.serveView('home', sendRes);
        break;
      case '/request':
        renderReq(req['params'], sendRes);
        break;
    }
  }
}

module.exports = RequestRouter;

function renderReq(params, sendRes) {
  if(params) {

  }
  else sendRes(null, 'An Error Occurred.');
}
