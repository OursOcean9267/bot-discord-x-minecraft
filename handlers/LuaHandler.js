const { glob } = require("glob");
const logger = require("../utils/logger");

module.exports = async (client) => {
    const luaCommandsPath = await glob(`${process.cwd()}/luaCommands/*/*.js`);

    for (const path of luaCommandsPath) {
        const luaCommand = require(`../${path}`);
        if ('data' in luaCommand && 'execute' in luaCommand) {
            client.luacommands.set(luaCommand.data.name, luaCommand);
        }
        else {
            logger.warn(`La commande Lua située à ce chemin ${path} manque d'une propriété "data" ou "execute" requise.`);
        }
    }
};