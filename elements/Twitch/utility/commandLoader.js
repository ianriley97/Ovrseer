module.exports = (app) => {
  const fs = require('fs');
  const path = require('path');
  var cmdPath = path.join(__dirname, '../commands/');
  fs.readdir((cmdPath), (err, files) => {
    if (err) console.error(err);
    files.forEach(f => {
      let cmd = require(`${cmdPath}${f}`);
      app.AddCommand(cmd);
    });
  });
}
