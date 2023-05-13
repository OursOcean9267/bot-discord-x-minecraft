const chalk = require("chalk");
const dayjs = require("dayjs");

const format = '{tStamp}{tag} {txt}\n';

function error(content) {
    log(content, 'black', '#ff5b57', 'ERR', true);
}

function warn(content) {
    log(content, 'black', '#aa8000', 'WRN', false);
}

function command(content) {
    log(content, 'black', '#57c7ff', 'CMD', false);
}

function event(content) {
    log(content, 'black', '#f3f99c', 'EVT', false);
}

function client(content) {
    log(content, 'black', '#5af78d', 'BOT', false);
}

function log(content, tagColor, bgTagColor, tag, error = false) {
    const timestamp = ` [${dayjs().format("HH:mm:ss")}] `;
    const logTag = ` [${tag}] `;
    const stream = error ? process.stderr : process.stdout;
    const item = format
        .replace('{tStamp}', chalk.bgGrey(timestamp))
        .replace('{tag}', chalk.bgHex(bgTagColor)[tagColor](logTag))
        .replace('{txt}', chalk.white(content));
    stream.write(item);
}

module.exports = { error, warn, command, event, client };