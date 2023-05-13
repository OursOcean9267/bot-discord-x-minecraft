const { glob } = require("glob");
const logger = require("../utils/logger");

module.exports = async (client) => {
    const selectsPath = await glob(`${process.cwd()}/selects/*/*.js`);

    for (const path of selectsPath) {
        const select = require(path);
        if ('data' in select && 'execute' in select) {
            client.selects.set(select.data.name, select);
        }
        else {
            logger.warn(`Le menu de séléction situé à ce chemin ${path} manque d'une propriété "data" ou "execute" requise.`);
        }
    }
};