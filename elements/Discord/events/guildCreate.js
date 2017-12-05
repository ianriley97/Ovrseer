module.exports = (app, args) => { // args = [guild]
  var guild = args[0];
  app.AddGuild(guild);
};
