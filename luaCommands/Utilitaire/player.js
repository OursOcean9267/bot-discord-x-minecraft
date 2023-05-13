module.exports = {
	data: {
		name: 'player',
	},
    async execute(cmd, client) {
		const toReply = client.guilds.cache.get(cmd.data.toReplyGuild).channels.cache.get(cmd.data.toReplyChannel).messages.cache.get(cmd.data.toReply);
		toReply.edit(`Le joueur **"${cmd.options[0]}"** est actuellement **${cmd.datalua[0] ? "en ligne" : "hors ligne"}**`);
	},
};