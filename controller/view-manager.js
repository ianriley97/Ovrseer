const FileSystem = require('fs');
const Path = require('path');

const ViewDir = Path.join(__dirname, '..', 'view');
const TemplateView = FileSystem.readFileSync(Path.join(ViewDir, 'view.template'), 'utf-8');
const FileTypes = [
  ['html', '<%content%>'],
  ['css', '<%style%>'],
  ['js', '<%script%>']
];

class ViewManager {
  constructor() {
    this.viewCache = new Map();
  }
  cacheViews() {
    var dirItems = FileSystem.readdirSync(ViewDir);
    dirItems.forEach(function(item) {
      var stats = FileSystem.statSync(Path.join(ViewDir, item));
      if(stats.isDirectory()) {
        constructView(item, function(data) {
          this.viewCache.set(item, data);
        });
      }
    });
  }
  serveView(view, cb) {
    try {
      var viewData = this.viewCache.get(view);
      cb(null, viewData);
    }
    catch(err) {
      cb(err);
    }
  }
}

module.exports = ViewManager;

function constructView(view, cb) {
  var viewFile = Path.join(ViewDir, view, view);
  var resView = TemplateView;
  resView = resView.replace('<%view%>', view[0].toUpperCase() + view.slice(1));
  buildView(viewFile, resView, FileTypes.slice(), cb);
}

function buildView(viewFile, resView, types, cb) {
  if(types.length == 0) cb(resView);
  else {
    var type = types.pop();
    try {
      var data = FileSystem.readFileSync(viewFile + '.' + type[0]);
      resView = resView.replace(type[1], data);
    } catch(err) {
      resView = resView.replace(type[1], '');
    }
    buildView(viewFile, resView, types, cb);
  }
}
