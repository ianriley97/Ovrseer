class Command {
  constructor(cmd) {
    this.Config = cmd.Config;
    this.Help = cmd.Help;
    this.Run = cmd.Run;
  }
}

module.exports = Command;
