const DiscordJS = require('discord.js');
const Log = require('../../../utility/logger.js');

const ExpGainRate = Number.parseInt(process.env.EXP_GAIN_RATE);
const ExpGainTimeFrame = Number.parseInt(process.env.EXP_GAIN_TIME_FRAME);
const ExpPerRank = Number.parseInt(process.env.EXP_PER_RANK);
class Member {
  constructor(member) {
    this.Member = member;
    this.PermLvl = 0;
    this.Exp = 0;
    this.Level = 1;
    this.CurLvlMaxExp = ExpPerRank;
    this.LastEligibleExpGainTime = 0;
  }
  AddExp() {
    var curTime = Date.now();
    if(curTime - this.LastEligibleExpGainTime >= (ExpGainTimeFrame*1000)) {
      this.LastEligibleExpGainTime = curTime;
      this.Exp += 1 * ExpGainRate;
      if(this.Exp >= this.CurLvlMaxExp) {
        this.Level += 1;
        this.Exp -= 0;
        this.CurLvlMaxExp = this.Level * ExpPerRank;
      }
    }
  }
}

module.exports = Member;
