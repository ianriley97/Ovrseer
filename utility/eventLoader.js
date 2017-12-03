module.exports = (app, appPath) => {
  const fs = require('fs');
  const path = require('path');
  var eventPath = path.join(appPath, './events/');
  fs.readdir((eventPath), (err, files) => {
    if (err) console.error(err);
    files.forEach(f => {
      app.Client.on(f.slice(0,-3), (item1, item2, item3, item4, item5, item6) => {
        var args = [];
        args.push(item1,item2,item3,item4,item5,item6);
        require(`${eventPath}${f}`)(app, args);
      });
    });
  });
};
