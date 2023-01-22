const Discord = require('discord.js');
const api = require('.../util/ritoapi.js');
const { getRank } = require('.../util/rank.js');

module.exports = {
    name: '!loss?',
    description: 'Check if you ended on a loss',
    args: true,
    usage: '!loss? "[summoner name]"',
    async execute(message, args) {
        // Get summoner name from args
        message.channel.send('Checking if you ended on a loss...');

        // Get summoner name from args
        if (args.length >= 2) {
            const region = args.shift();
            const name = args.join(' ');

            let res = await api.getSummoner(region, name);
            const id = res.data.id;
            const summonerName = res.data.name;

            // Get match history
            res = await api.getRecentMatchHistory(region, id);
            const matchId = res.data[0];

            res = await api.getMatchHistory(region, matchId);
            const win = res.win;
            const kill = res.kill;
            const death = res.death;

            // Get rank
            const rank = await getRank(region, id);

            // If they lost, send a message saying they won and display their stats and rank
            if (win === false) {
                const embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('Fat L!')
                    .setURL(`https://${region}.op.gg/summoner/userName=${summonerName}`)
                    .setDescription(`WE DO NOT END ON A LOSS!`)
                    .addFields(
                        { name: 'Summoner Name', value: `${summonerName}`, inline: true },
                        { name: 'Rank', value: `${rank}`, inline: true },
                        { name: 'K/D', value: `${kill}/${death}`, inline: true },
                    )
                    .setTimestamp()

                message.channel.send(embed);
                }

            // If they won, send a message saying they lost and display their stats and rank
            if (win === true) {
                const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Fat W!')
                .setURL(`https://${region}.op.gg/summoner/userName=${summonerName}`)
                .setDescription(`WE END ON A WIN!`)
                .addFields(
                    { name: 'Summoner Name', value: `${summonerName}`, inline: true },
                    { name: 'Rank', value: `${rank}`, inline: true },
                    { name: 'K/D', value: `${kill}/${death}`, inline: true },
                )
                .setTimestamp()

            message.channel.send(embed);
            }
        } else {
            message.reply('Imagine typing a wrong summoner name...could never be me.');
        }
    },
};

// Path: util\api.js

const fetch = require('node-fetch');
require ('dotenv').config();

client.login(process.env.TOKEN);