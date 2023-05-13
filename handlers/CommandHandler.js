const { REST, Routes } = require("discord.js");
const { clientID, token } = require("../config.json");
const { glob } = require("glob");
const logger = require("../utils/logger");

module.exports = async (client) => {
    const commandPaths = await glob(`${process.cwd()}/commands/*/*.js`);
    const commands = [];

    for (const path of commandPaths) {
        const command = require(`../${path}`);
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
            commands.push(command.data.toJSON());
            logger.command(`Commande "/${command.data.name}" chargée`);
        }
        else {
            logger.warn(`La commande située à ce chemin ${path} manque d'une propriété "data" ou "execute" requise.`);
        }
    }

    const rest = new REST().setToken(token);

    (async () => {
        try {
            logger.client(`Actualisation de ${commands.length} commandes d'application.`);

            const data = await rest.put(
                Routes.applicationCommands(clientID),
                { body: commands },
            );

            logger.client(`Actualisé ${data.length} commandes d'application.`);
        }
        catch (error) {
            logger.error(error);
        }
    })();
};