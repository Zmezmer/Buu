const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('itscorn')
		.setDescription('I can\'t imagine a more beautiful thing.'),
	async execute(interaction) {
		const player = createAudioPlayer();

		player.on('error', error => {
			console.error(`Error: ${error.message} with resource.`);
		});

		const resource = createAudioResource('./media/itscorn.ogg');
		player.play(resource);

		const connection = joinVoiceChannel({
			channelId: interaction.member.voice.channelId,
			guildId: interaction.guildId,
			adapterCreator: interaction.guild.voiceAdapterCreator,
		});

		interaction.reply({ content: 'A big lump with knobs! It\'s corn!', ephemeral: true });

		const subscription = connection.subscribe(player);

		if (subscription) {
			setTimeout(() => connection.destroy(), 3_000);
		}
	},
};