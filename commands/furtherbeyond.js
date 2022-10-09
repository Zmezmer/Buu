const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('furtherbeyond')
		.setDescription('Even further beyond!'),
	async execute(interaction) {
		const player = createAudioPlayer();

		player.on('error', error => {
			console.error(`Error: ${error.message} with resource.`);
		});

		const resource = createAudioResource('./media/furtherbeyond.ogg');
		player.play(resource);

		const connection = joinVoiceChannel({
			channelId: interaction.member.voice.channelId,
			guildId: interaction.guildId,
			adapterCreator: interaction.guild.voiceAdapterCreator,
		});

		interaction.reply({ content: 'OVER 9000!', ephemeral: true });

		const subscription = connection.subscribe(player);

		if (subscription) {
			setTimeout(() => connection.destroy(), 15_000);
		}
	},
};