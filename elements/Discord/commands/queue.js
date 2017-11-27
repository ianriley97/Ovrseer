exports.Config = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.Help = {
  name: 'queue',
  description: 'Show the current queue or enqueue a YouTube media track.',
  usage: 'queue , queue <searchstring/videolink>'
};

exports.Run = (message, params, objs) => {
  var guild = objs.guild;
  message.reply(guild.GetQueueList());
};
