const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('butterdog')
		.setDescription('It\'s butterdog. What else?'),
	async execute(interaction) {
		interaction.reply('https://i.imgur.com/Nu3QK2N.png');
	},
};