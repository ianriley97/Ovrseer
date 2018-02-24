const moment = require('moment');
const chalk = require('chalk');

const Default = (style, msg) => console.log(style(TimeStamp + " " + msg));
var LogStyle = Default;

const TimeStamp = "[" + moment().format('YYYY-MM-DD HH:mm:ss') + "]";
module.exports = {
  default: (msg) => LogStyle(chalk, msg),
  ready: (msg) => LogStyle(chalk.green, msg),
  disconnected: (msg) => LogStyle(chalk.red, msg),
  reconnecting: (msg) => LogStyle(chalk.yellow, msg),
  command: (msg) => LogStyle(chalk.yellow, msg),
  Discord: (msg) => LogStyle(chalk.cyan, msg),
  Guild: (msg) => LogStyle(chalk.cyan, msg),
  Twitch: (msg) => LogStyle(chalk.magenta, msg),
};
