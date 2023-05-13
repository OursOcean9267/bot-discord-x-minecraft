const { glob } = require("glob");
const logger = require("../utils/logger");

module.exports = async (client) => {
    const buttonsPath = await glob(`${process.cwd()}/buttons/*/*.js`);

    for (const path of buttonsPath) {
        const button = require(path);
        if ('data' in button && 'execute' in button) {
            client.buttons.set(button.data.name, button);
        }
        else {
            logger.warn(`Le bouton situé à ce chemin ${path} manque d'une propriété "data" ou "execute" requise.`);
        }
    }
};