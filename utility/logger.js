const moment = require('moment');
const chalk = require('chalk');

const Default = (style, msg) => console.log(style(TimeStamp + " " + msg));
var LogStyle = Default;

const TimeStamp = "[" + moment().format('YYYY-MM-DD HH:mm:ss') + "]";
module.exports = function(type, msg) {
  var log = logTypes[type];
  if(!log) log = function(msg) { LogStyle(chalk, msg); }
  log(msg);
};

var logTypes = {
  ready: function(msg) { LogStyle(chalk.green, msg) },
  disconnected: function(msg) { LogStyle(chalk.red, msg) },
  reconnecting: function(msg) { LogStyle(chalk.yellow, msg) },
  command: function(msg) { LogStyle(chalk.yellow, msg) },
  discord: function(msg) { LogStyle(chalk.cyan, msg) },
  twitch: function(msg) { LogStyle(chalk.magenta, msg) }
};
