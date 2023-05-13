const https = require('https');
const fs = require('fs');

function toMc(commande, username, options, data) {
	const cmdid = String(Date.now());
	const optionsValues = options.map(option => option.value.replaceAll(' ', '+'));
	const usernameNew = username.replaceAll(' ', '+');
	const opts = {
		hostname: 'discord-x-minecraft.000webhostapp.com',
		path: `/?author=js&commande=${commande}&username=${usernameNew}&options=${JSON.stringify(optionsValues)}&cmdid=${cmdid}`,
		method: 'GET',
	};
	const req = https.request(opts);

	req.on('error', error => {
		console.error(error);
	});

	req.end();

    const jsonCmd = {
        cmdid: cmdid,
        commandName: commande,
        username: username,
        options: optionsValues,
        data: data,
    };

    const json = JSON.parse(fs.readFileSync("commands.json", "utf8"));
    json.push(jsonCmd);
    fs.writeFileSync("commands.json", JSON.stringify(json), "utf8");
}

module.exports = { toMc };