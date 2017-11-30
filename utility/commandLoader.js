const Commands = require('../collections/commands.js');

module.exports = () => {
  const fs = require('fs');
  const path = require('path');
  var cmdsPath = path.join(__dirname, '../commands/');
  fs.readdir((cmdsPath), (err, files) => {
    if (err) console.error(err);
    files.forEach(f => {
      let cmd = require(`${cmdsPath}${f}`);
      Commands.AddCommand(cmd.Help.name, cmd);
    });
  });
};
