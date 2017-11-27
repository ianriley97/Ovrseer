exports.Config = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.Help = {
  name: 'rank',
  description: 'Shows our current guild ranking.',
  usage: 'rank'
};

exports.Run = (message, params, objs) => {
  var memberObj = objs.member;
  message.reply(` you are **Rank ${memberObj.Level}** and have **${memberObj.Exp} of ${memberObj.CurLvlMaxExp}** exp.`);
}
