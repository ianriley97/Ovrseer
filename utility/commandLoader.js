const Commands = require('../collections/commands.js');

module.exports = () => {
  const fs = require('fs');
  const path = require('path');
  var cmdPath = path.join(__dirname, '../commands/');
  fs.readdir((cmdPath), (err, files) => {
    if (err) console.error(err);
    files.forEach(f => {
      let cmd = require(`${cmdPath}${f}`);
      Commands.AddCommand(cmd.Help.name, cmd);
    });
  });
};
