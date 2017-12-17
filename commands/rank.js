exports.Config = {
  enabled: true,
  default: false,
  aliases: []
};

exports.Help = {
  name: 'rank',
  description: 'Shows your current guild ranking.',
  usage: 'rank'
};

exports.Run = {
  Discord: (message, params, objs) => {
    var memberObj = objs.member;
    message.reply(` you are **Rank ${memberObj.Level}** and have **${memberObj.Exp} of ${memberObj.CurLvlMaxExp}** exp.`);
  }
};
