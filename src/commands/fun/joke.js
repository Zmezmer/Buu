const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');
const { pink } = require('../../colors.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('joke')
		.setDescription('Buu will tell a joke.'),
	async execute(interaction) {
		const getJoke = async () => {
			const response = await axios.get(
				'https://official-joke-api.appspot.com/random_joke',
			);
			const joke = response.data;
			return joke;
		};
		const jokeValue = await getJoke();
		const embed = new EmbedBuilder()
			.setThumbnail('https://i.imgur.com/Nu3QK2N.png')
			.setColor(pink)
			.setDescription(`${jokeValue.setup}\n\n${jokeValue.punchline}`);
		interaction.reply({ embeds: [embed] });
	},
};