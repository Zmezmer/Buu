const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('zach')
		.setDescription('It\'s Zach.'),
	async execute(interaction) {
		const player = createAudioPlayer();

		player.on('error', error => {
			console.error(`Error: ${error.message} with resource.`);
		});

		const resource = createAudioResource('./media/zach.ogg');
		player.play(resource);

		const connection = joinVoiceChannel({
			channelId: interaction.member.voice.channelId,
			guildId: interaction.guildId,
			adapterCreator: interaction.guild.voiceAdapterCreator,
		});

		interaction.reply({ content: 'ZAAACH!', ephemeral: true });

		const subscription = connection.subscribe(player);

		if (subscription) {
			setTimeout(() => connection.destroy(), 3_000);
		}
	},
};