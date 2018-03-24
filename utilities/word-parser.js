const Path = require('path');
const FileSystem = require('fs');

module.exports = {
  find: find,
  replace: replace
}

function find(str, list) {
  const filter = new RegExp('\\b(' + list.join('|') + ')\\b', 'gim');
  var found = [];
  do {
    var f = filter.exec(str);
    if (f) found.push(f);
  } while (f);
  return found;
}

function replace(str, list) {
  const filter = new RegExp('\\b(' + list.join('|') + ')\\b', 'gim');
  var found = [];
  var newStr = str.replace(filter, function() {
    var f = arguments[0];
    found.push(f);
    var bw = '';
    for(var i = 0; i < f.length; i++) bw += '*';
    return bw;
  });
  return {
    'found': found,
    'newStr': newStr
  }
}
