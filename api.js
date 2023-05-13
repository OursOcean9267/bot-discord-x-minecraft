const https = require('https');
const fs = require('fs');
const logger = require("./utils/logger");

module.exports = async (client) => {
    setInterval(() => {
        https.get("https://discord-x-minecraft.000webhostapp.com/minecraftToDiscord.json", (res) => {
            res.on('data', (d) => {
                const json = JSON.parse(d.toString());
                const old_cmd = fs.readFileSync("old_cmd.txt", "utf8");
                const new_cmd = json.cmdid;

                if (old_cmd !== new_cmd) {
                    fs.writeFileSync("old_cmd.txt", new_cmd, "utf8");
                    const commands = JSON.parse(fs.readFileSync("commands.json", "utf8"));

                    if (!commands.find(cmd => cmd.cmdid === new_cmd)) {
                        logger.error(`Aucune commande en cours correspondate à l'ID "${new_cmd}" a été trouvée`);
                    }
                    else {
                        const cmd = commands.find(commande => commande.cmdid === new_cmd);
                        cmd.datalua = json.data;
                        const command = client.luacommands.get(cmd.commandName);

                        if (!command) {
                            logger.error(`Aucune commande lua correspondante à "${cmd.commandName}" a été trouvée`);
                            return;
                        }

                        try {
                            command.execute(cmd, client);
                            const jsonCmds = JSON.parse(fs.readFileSync("commands.json", "utf8"));
                            jsonCmds.splice(commands.indexOf(cmd), 1);
                            fs.writeFileSync("commands.json", JSON.stringify(jsonCmds), "utf8");
                        }
                        catch (error) {
                            logger.error(error);
                        }
                    }
                }
            });
        });
    }, 500);
};