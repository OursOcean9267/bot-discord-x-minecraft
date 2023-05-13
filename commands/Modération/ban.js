const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { toMc } = require('../../utils/toMc');

module.exports = {
	category: "Modération",
	data: new SlashCommandBuilder()
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
		.setName('ban')
		.setDescription('Bannir un joueur sur Minecraft.')
        .addStringOption(option =>
            option.setName('joueur')
                .setDescription('Le pseudo de joueur à bannir'))
        .addStringOption(option =>
            option.setName('raison')
                .setDescription('Le raison du bannissement')
                .setRequired(false)),
	async execute(interaction) {
		const sent = await interaction.reply({ content: "Chargement... Veuillez patienter...", fetchReply: true });

        const data = {
			toReply: sent.id,
			toReplyChannel: sent.channelId,
			toReplyGuild: sent.guildId,
		};
		toMc(interaction.commandName, interaction.user.username, interaction.options._hoistedOptions, data);
	},
};