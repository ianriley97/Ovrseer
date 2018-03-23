module.exports = function(app, args) { // args = [oldGuild, newGuild]
  var client = app.client;
  var oldGuild = args[0];
  var newGuild = args[1];
  app.updateGuild(newGuild);
};
