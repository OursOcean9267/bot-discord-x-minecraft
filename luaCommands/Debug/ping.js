module.exports = {
	data: {
		name: 'ping',
	},
    async execute(cmd, client) {
		const toReply = client.guilds.cache.get(cmd.data.toReplyGuild).channels.cache.get(cmd.data.toReplyChannel).messages.cache.get(cmd.data.toReply);
		toReply.edit(`Latence de l'infrastructure : **${Date.now() - cmd.cmdid}ms**`);
	},
};