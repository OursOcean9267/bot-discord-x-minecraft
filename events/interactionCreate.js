const { Events } = require('discord.js');
const logger = require("../utils/logger");

module.exports = {
    name: Events.InteractionCreate,
    once: false,
    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            const command = interaction.client.commands.get(interaction.commandName);

            if (!command) {
                logger.error(`Aucune commande correspondante à "${interaction.commandName}" a été trouvé`);
                return;
            }

            try {
                await command.execute(interaction, client);
            }
            catch (error) {
                logger.error(error);
                await interaction.reply({ content: 'Une erreur est survenue durant l\'exécution de cette commande.', ephemeral: true });
            }
        }


        else if (interaction.isAutocomplete()) {
            const command = interaction.client.commands.get(interaction.commandName);

            if (!command) {
                logger.error(`Aucune commande correspondante à "${interaction.commandName}" a été trouvé`);
                return;
            }

            try {
                await command.autocomplete(interaction);
            }
            catch (error) {
                logger.error(error);
            }
        }

        else if (interaction.isUserContextMenuCommand() || interaction.isMessageContextMenuCommand()) {
			const contextMenu = interaction.client.contextMenus.get(interaction.commandName);
			if (!contextMenu) {
				logger.error(`Aucun menu contextuel correspondant à "${interaction.commandName}" a été trouvé`);
				return;
			}

			try {
				await contextMenu.execute(interaction, client);
			}
			catch (error) {
				logger.error(error);
				await interaction.reply({ content: 'Une erreur est survenue durant l\'exécution de ce menu contextuel.', ephemeral: true });
			}
		}

        else if (interaction.isButton()) {
			const button = interaction.client.buttons.get(interaction.customId);
			if (!button) {
				logger.error(`Aucun bouton correspondant à "${interaction.customId}" a été trouvé`);
				return;
			}

			try {
				await button.execute(interaction, client);
			}
			catch (error) {
				logger.error(error);
				await interaction.reply({ content: 'Une erreur est survenue durant l\'exécution de ce bouton.', ephemeral: true });
			}
		}


		else if (interaction.isStringSelectMenu()) {
			const select = interaction.client.selects.get(interaction.customId);
			if (!select) {
				logger.error(`Aucun menu de séléction correspondant à "${interaction.customId}" a été trouvé`);
				return;
			}

			try {
				await select.execute(interaction, client);
			}
			catch (error) {
				logger.error(error);
				await interaction.reply({ content: 'Une erreur est survenue durant l\'exécution de ce menu de séléction.', ephemeral: true });
			}
		}
    },
};