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

exports.Run = (app, guild, message, params) => {
  message.reply(` you are **Rank ${member.Level}** and have **${member.Exp} of ${member.CurLvlMaxExp}** exp.`);
}
