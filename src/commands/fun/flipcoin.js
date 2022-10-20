const { SlashCommandBuilder } = require('discord.js');
const { Chance } = require('chance');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('flipcoin')
		.setDescription('Heads or tails?'),
	async execute(interaction) {
		const chance = new Chance();
		const result = chance.coin();
		interaction.reply(result);
	},
};