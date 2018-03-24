const FileSystem = require('fs');
const Path = require('path');

const ViewDir = Path.join(__dirname, '..', 'view');
const TemplateView = FileSystem.readFileSync(Path.join(ViewDir, 'template.html'));
const FileTypes = [
  ['html', '<body>'],
  ['css', '<style>'],
  ['js', '<script>']
];

function render(reqUrl, sendRes) {
  switch(reqUrl) {
    case '/':
      serveView('home', sendRes);
      break;
  }
}

module.exports = {
  render: render
}

function serveView(view, sendRes) {
  var viewFile = Path.join(ViewDir, view, view);
  var resView = TemplateView;
  var fileTypes = FileTypes.slice(0);
  buildView(viewFile, resView, fileTypes, sendRes);
}

function buildView(viewFile, resView, types, sendRes) {
  if(types.length == 0) sendRes(null, resView);
  else {
    var type = types.pop();
    FileSystem.readFile(viewFile + '.' + type[0], function(err, data) {
      if(data) {
        var pos = resView.indexOf(type[1]) + type[1].length;
        resView = [resView.slice(0, pos), data, resView.slice(pos)].join('');
      }
      buildView(viewFile, resView, types, sendRes);
    });
  }
}
