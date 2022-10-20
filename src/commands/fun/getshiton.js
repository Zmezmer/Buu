const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('getshiton')
		.setDescription('Get shit on!'),
	async execute(interaction) {
		const player = createAudioPlayer();

		player.on('error', error => {
			console.error(`Error: ${error.message} with resource ${error.resource.metadata.title}`);
		});

		const resource = createAudioResource('./src/media/bunit.ogg');
		player.play(resource);

		const connection = joinVoiceChannel({
			channelId: interaction.member.voice.channelId,
			guildId: interaction.guildId,
			adapterCreator: interaction.guild.voiceAdapterCreator,
		});

		interaction.reply({ content: 'GOT EM!', ephemeral: true });

		const subscription = connection.subscribe(player);

		if (subscription) {
			setTimeout(() => connection.destroy(), 3_000);
		}
	},
};