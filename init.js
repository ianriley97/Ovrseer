require('dotenv').config();
/*
  ".env" file data items needed:
  ------------------------------
  DISCORD_OWNER_ID=[your Discord ID]
  DISCORD_BOT_TOKEN=[your Discord API bot token]
  DEFAULT_CMD_PREFIX=[your preferred defaut command prefix]
  EXP_GAIN_RATE=[amount of exp to gain per actuation]
  EXP_PER_RANK=[amount increased of exp needed per rank]
  EXP_GAIN_TIME_FRAME=[time in seconds between each allowable exp gain]
  GOOGLE_KEY=[key for validating youtube functionality]
  TWITCH_KEY=[oauth token for twitch bot's channel]
  TWITCH_BOT_NAME=[username of twitch bot's account]
  TWITCH_CHANNELS=[channels for bot to join]
*/
require('./server/server.js');
require('./utility/commandLoader.js')();
var Discord = new (require('./elements/Discord/client.js'))();
// var Twitch = new (require('./elements/Twitch/client.js'))();
