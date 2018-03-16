const FileSystem = require('fs');
const Path = require('path');

const ViewDir = Path.join(__dirname, '..', 'views');

function render(page, cb) {
  FileSystem.readFile(, function(err, dir) {
    if(err) cb(err);
    else {

    }
  });
}

module.exports = {
  render: render
}
