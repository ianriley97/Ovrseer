class Guild {
  constructor(guild) {
    this.Guild = guild;
    this.CmdPrefix = process.env.DEFAULT_CMD_PREFIX;
  }
  SetCmdPrefix(newPrefix) {
    this.CmdPrefix = newPrefix;
  }
}

module.exports = Guild;
