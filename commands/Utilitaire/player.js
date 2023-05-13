const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { toMc } = require('../../utils/toMc');

module.exports = {
	category: "Utilitaire",
	data: new SlashCommandBuilder()
		.setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
		.setName('player')
		.setDescription('Affiche si un joueur est en ligne ou non.')
        .addStringOption(option =>
            option.setName('joueur')
                .setDescription('Le pseudo de joueur à rechercher')),
	async execute(interaction) {
		const sent = await interaction.reply({ content: "Obtention des informations... Veuillez patienter...", fetchReply: true });

        const data = {
			toReply: sent.id,
			toReplyChannel: sent.channelId,
			toReplyGuild: sent.guildId,
		};
		toMc(interaction.commandName, interaction.user.username, interaction.options._hoistedOptions, data);
	},
};