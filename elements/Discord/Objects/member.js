const DiscordJS = require('discord.js');
const Log = require('../../../utility/logger.js');

const ExpGainRate = Number.parseInt(process.env.EXP_GAIN_RATE);
class Member {
  constructor(member) {
    this.Member = member;
    this.PermLvl = 0;
    this.Exp = 0;
    this.Level = 0;
    this.CurLvlMaxExp = 0;
  }
  AddExp(exp) {
    this.Exp += exp * ExpGainRate;
    this.CurLvlMaxExp = this.Level * 10;
    if(this.Exp >= curLvlMaxExp) {
      this.Level += 1;
      this.Exp -= curLvlMaxExp;
    }
  }
}

module.exports = Member;
