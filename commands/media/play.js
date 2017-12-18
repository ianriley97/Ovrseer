exports.Config = {
  enabled: true,
  default: false,
  aliases: []
};

exports.Help = {
  name: 'play',
  description: 'Search and play a YouTube media track.',
  usage: 'play <searchstring/videolink>'
};

exports.Run = {
  Discord: (message, params, objs) => {
    var guild = objs.guild;
    var member = message.member;
    guild.RequestMedia(params.join(' '), (msg, info) => (info ? message.reply(`**(${msg})** : ${info}`) : message.reply(`${msg}`)), member.voiceChannel);
  }
};
