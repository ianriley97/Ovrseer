const FileSystem = require('fs');
const Path = require('path');

const ViewDir = Path.join(__dirname, '..', 'views');

function render(page, cb) {
  FileSystem.readFile(Path.join(ViewDir, page, (page + '.html')), function(err, data) {
    if(err) cb(err);
    else {
      cb(err, data);
    }
  });
}

module.exports = {
  render: render
}
