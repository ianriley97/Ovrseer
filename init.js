require('dotenv').config();
require('./server/server.js');
var DiscordOptions = {
  owners: [
      '234921929188966401'
  ],
  cmdPrefix: '>',
  defPrefix: '>',
  token: process.env.DISCORD_BOT_TOKEN
}
var Discord = new (require('./elements/Discord/discord.js'))(DiscordOptions);
