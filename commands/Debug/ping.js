const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { toMc } = require('../../utils/toMc');

module.exports = {
	category: "Debug",
	data: new SlashCommandBuilder()
		.setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
		.setName('ping')
		.setDescription('Renvoie le ping de l\'infrastructure (aller-retour de Minecraft à Discord)'),
	async execute(interaction) {
		const sent = await interaction.reply({ content: "Calcul de la latence... Veuillez patienter...", fetchReply: true });

        const data = {
			toReply: sent.id,
			toReplyChannel: sent.channelId,
			toReplyGuild: sent.guildId,
		};
		toMc(interaction.commandName, interaction.user.username, interaction.options._hoistedOptions, data);
	},
};