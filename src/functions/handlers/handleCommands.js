const { REST, Routes } = require('discord.js');
const fs = require('fs');
const { clientId, guildId, token } = require('../../../config.json');

module.exports = (client) => {
	client.handleCommands = async () => {
		const commandFolders = fs.readdirSync('./src/commands');
		for (const folder of commandFolders) {
			const commandFiles = fs
				.readdirSync(`./src/commands/${folder}`)
				.filter((file) => file.endsWith('.js'));

			const { commands, commandArray } = client;
			for (const file of commandFiles) {
				const command = require(`../../commands/${folder}/${file}`);
				commands.set(command.data.name, command);
				commandArray.push(command.data.toJSON());
			}
		}

		const rest = new REST({ version: '10' }).setToken(token);
		try {
			console.log(`Started refreshing ${client.commandArray.length} commands.`),

			await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
				body: client.commandArray,
			});

			console.log(`Successfully reloaded ${client.commandArray.length} commands.`);
		}	catch (error) {
			console.error(error);
		}
	};
};