const moment = require('moment');
const chalk = require('chalk');

const Default = function(style, msg) { console.log(style(TimeStamp + " " + msg)); }
var LogStyle = Default;

const TimeStamp = "[" + moment().format('YYYY-MM-DD HH:mm:ss') + "]";
module.exports = function(msg) {
   LogStyle(chalk, msg)
 };
  // ready: function(msg) { LogStyle(chalk.green, msg) },
  // disconnected: function(msg) { LogStyle(chalk.red, msg) },
  // reconnecting: function(msg) { LogStyle(chalk.yellow, msg) },
  // command: function(msg) { LogStyle(chalk.yellow, msg) },
  // Discord: function(msg) { LogStyle(chalk.cyan, msg) },
  // Twitch: function(msg) { LogStyle(chalk.magenta, msg) }
