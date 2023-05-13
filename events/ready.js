const { Events } = require("discord.js");
const logger = require("../utils/logger");
const chalk = require("chalk");

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        logger.client(`Démarré en tant que ${chalk.underline.hex("#AAAAAA")(client.user.tag)}`);
    },
};