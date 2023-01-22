const Discord = require('discord.js');
const api = require('../util/ritoapi.js');
const { getRank } = require('../util/rank.js');

module.exports = {
    name: 'loss?',
    description: 'Check if you ended on a loss',
    args: true,
    usage: 'loss? "[summoner name]"',
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
            const assists = res.assists;

            // Get rank
            const rank = await getRank(region, id);

            // If summoner lost and they had more kills than deaths or had more deaths than kills but assists is greater than 8, send a message saying they lost and display their stats and rank
            if (win === false && kill > death || death > kill && assists > 8) {
                const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Ngl your team inted you...')
                .setURL(`https://${region}.op.gg/summoner/userName=${summonerName}`)
                .setDescription(`BUT WE DON'T END ON A LOSS`)
                .addFields(
                    { name: 'Summoner Name', value: `${summonerName}`, inline: true },
                    { name: 'Rank', value: `${rank}`, inline: true },
                    { name: 'K/D/A', value: `${kill}/${death}/${assists}`, inline: true },
                )
                .setTimestamp()

            message.channel.send(embed);
            }

            // If summoner lost and they had more deaths than kills or assists in less than 8, send a message saying they lost and display their stats and rank
            if (win === false && death > kill || death > kill && assists < 8) {
                const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Wow you are actually heavy')
                .setURL(`https://${region}.op.gg/summoner/userName=${summonerName}`)
                .setDescription(`BUT WE DON'T END ON A LOSS`)
                .addFields(
                    { name: 'Summoner Name', value: `${summonerName}`, inline: true },
                    { name: 'Rank', value: `${rank}`, inline: true },
                    { name: 'K/D/A', value: `${kill}/${death}/${assists}`, inline: true },
                )
                .setTimestamp()

            message.channel.send(embed);
            }

            // If summoner won and they had more kills than deaths or assists in greater than 8, send a message saying they won and display their stats and rank
            if (win === true && kill > death || death > kills && assists > 8) {
                const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle("THAT'S WHAT I LIKE TO SEE. EZ DUBS")
                .setURL(`https://${region}.op.gg/summoner/userName=${summonerName}`)
                .setDescription(`TGF 1 MORE!`)
                .addFields(
                    { name: 'Summoner Name', value: `${summonerName}`, inline: true },
                    { name: 'Rank', value: `${rank}`, inline: true },
                    { name: 'K/D/A', value: `${kill}/${death}/${assists}`, inline: true },
                )
                .setTimestamp()

            message.channel.send(embed);
            }

            // If summoner won and they had more deaths than kills and assists in less than 8, send a message saying they won and display their stats and rank
            if (win === true && death > kill || death > kills && assists < 8) {
                const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Imagine being carried...get better')
                .setURL(`https://${region}.op.gg/summoner/userName=${summonerName}`)
                .setDescription(`TGF 1 MORE!`)
                .addFields(
                    { name: 'Summoner Name', value: `${summonerName}`, inline: true },
                    { name: 'Rank', value: `${rank}`, inline: true },
                    { name: 'K/D/A', value: `${kill}/${death}/${assists}`, inline: true },
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

// Discord.Client.login(process.env.TOKEN);