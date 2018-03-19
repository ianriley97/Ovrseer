const Path = require('path');
const FileSystem = require('fs');

const Blacklist = FileSystem.readFileSync(Path.join(__dirname, 'blacklist.txt'), 'utf-8').split('\n');
Blacklist.pop();

module.exports = {
  blacklist: Blacklist.slice(),
  parse: parse
}

function parse(str, list) {
  const filter = new RegExp('\\b(' + list.join('|') + ')\\b', 'gim');
  var found = [];
  do {
    var f = filter.exec(str);
    if (f) found.push(f);
  } while (f);
  return found;
}
