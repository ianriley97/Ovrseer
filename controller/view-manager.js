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
    var viewCache = this.viewCache;
    var dirItems = FileSystem.readdirSync(ViewDir);
    dirItems.forEach(function(item) {
      var stats = FileSystem.statSync(Path.join(ViewDir, item));
      if(stats.isDirectory()) {
        constructView(item, function(data) {
          viewCache.set(item, data);
        });
      }
    });
  }
  serve(req, res) {
    var data = this.viewCache.get(req.view);
    if(data) res.end(data);
    else {
      FileSystem.readFile(Path.join(ViewDir, req.url), function(err, data) {
        if(err) {
          console.log(err);
          res.statusCode = 404;
          res.end('File Not Found.');
        }
        else res.end(data);
      });
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
