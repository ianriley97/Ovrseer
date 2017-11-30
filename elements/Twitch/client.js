const App = require('../../objects/inheritance/client.js');
const TMIJS = require('tmi.js');

class TwitchClient extends App {
  constructor() {
    super(1);
    this.Client = new TMIJS.client({identity:{username:process.env.TWITCH_BOT_NAME,password: process.env.TWITCH_KEY},channels:[process.env.TWITCH_CHANNELS]});
    require('./eventLoader.js')(this);
    this.Client.connect();
  };
}

module.exports = TwitchClient;
