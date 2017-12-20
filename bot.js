require('dotenv').config();
require('./server/server.js');
require('./utility/commandLoader.js')();

module.exports = {
  DiscordApp: new (require('./objects/client/Discord/client.js'))(),
  TwitchApp: new (require('./objects/client/Twitch/client.js'))()
}
