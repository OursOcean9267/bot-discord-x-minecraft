const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const logger = require("./utils/logger");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.DirectMessages,
  ],
});

// Définition des collections
["commands", "buttons", "selects", "luacommands"].forEach(x => client[x] = new Collection());

// Définition de l'API
require("./api.js")(client);

// Définition des handlers (./handlers)
["CommandHandler", "EventHandler", "ButtonHandler", "SelectHandler", "LuaHandler"].forEach(handler => { require(`./handlers/${handler}`)(client); });

// Gérer les erreurs et les afficher dans la console
process.on("exit", code => { logger.error(`Le processus s'est arrêté avec le code : ${code}`); });
process.on("uncaughtException", (err, origin) => {
  logger.error(`UNCAUGHT_EXCEPTION : ${err}`);
  console.log(`Origine : ${origin}`);
});
process.on("unhandledRejection", (reason, promise) => {
  logger.warn(`UNHANDLED_REJECTION : ${reason}`);
  console.log(promise);
});
process.on("warning", (...args) => logger.warn(...args));


client.login(token);
