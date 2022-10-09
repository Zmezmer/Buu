const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('beanjuice')
		.setDescription('Always drink your bean juice.'),
	async execute(interaction) {
		interaction.reply('https://imgur.com/DqMam5s');
	},
};