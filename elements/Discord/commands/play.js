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

exports.Run = (app, guild, member, message, params) => {
  guild.RequestMedia(params.join(' '), message.member.voiceChannel, (msg) => {
    message.reply(msg);
  });
};
