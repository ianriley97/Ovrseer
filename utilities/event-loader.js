module.exports = function(app, appPath) {
  const FileSystem = require('fs');
  const Path = require('path');
  var client = app.client;
  var eventPath = Path.join(appPath, 'events');
  FileSystem.readdir(eventPath, function(err, files) {
    if(err) console.error(err);
    else {
      var events = new Map();
      files.forEach(function(file) {
        events.set(file.slice(0,-3), require(Path.join(eventPath, file)));
      });
      events.forEach(function(fn, name) {
        client.on(name, function() {
          fn(app, arguments);
        });
      });
    }
  });
};
