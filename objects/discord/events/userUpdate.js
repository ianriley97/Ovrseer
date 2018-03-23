module.exports = function(app, args) { // args = [oldUser, newUser]
  var client = app.client;
  var oldUser = args[0];
  var newUser = args[1];
  app.updateUser(newUser);
};
