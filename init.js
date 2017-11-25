require('dotenv').config();
/*
  ".env" file data items needed:
  ------------------------------
  DISCORD_OWNER_ID=[your Discord ID]
  DISCORD_BOT_TOKEN=[your Discord API bot token]
  DEFAULT_CMD_PREFIX=[your preferred defaut command prefix]
  EXP_GAIN_RATE=[amount of exp to gain per actuation]
*/
// require('./server/server.js');
var Discord = new (require('./elements/Discord/Objects/client.js'))();
