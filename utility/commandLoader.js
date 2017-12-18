const Commands = require('../collections/commands.js');

module.exports = () => {
  const fs = require('fs');
  const path = require('path');
  var cmdPath = path.join(__dirname, '../commands/');
  fs.readdir((cmdPath), (err, dirs) => {
    if (err) console.error(err);
    dirs.forEach(d => {
      if(fs.statSync(`${cmdPath}${d}`).isDirectory()) {
        Commands[d] = new Map();
        var dirPath = `${cmdPath}${d}/`;
        fs.readdir((dirPath), (err, files) => {
          if (err) console.error(err);
          files.forEach(f => {
            let cmd = require(`${dirPath}${f}`);
            cmd.Help.group = d;
            Commands.AddGroup(d);
            Commands.AddCommand(cmd.Help.name, cmd, d);
          });
        });
      }
      else {
        let cmd = require(`${cmdPath}${d}`);
        Commands.AddCommand(cmd.Help.name, cmd);
      }
    });
  });
};
