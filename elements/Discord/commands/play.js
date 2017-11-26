exports.Config = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.Help = {
  name: 'play',
  description: 'Search and play a YouTube media track.',
  usage: 'play <searchstring/videolink>'
};

exports.Run = (app, guild, message, params) => {
  var member = message.member;
  guild.RequestMedia(params.join(' '), 'discord', (msg) => message.reply(msg), member.voiceChannel);
};
