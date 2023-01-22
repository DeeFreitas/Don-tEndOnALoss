const Discord = require('discord.js');
const api = require('../util/ritoapi.js');
const { getRank } = require('../util/rank.js');

module.exports = {
    name: 'loss?',
    description: 'Check if you ended on a loss',
    args: true,
    usage: 'loss? "[summoner name]"',
    async execute(message, args) {
        message.channel.send('Checking if you ended on a loss...');

        // Creating name variable
        let name = '';

        // Verify how many args are passed in
        console.log(args.length);

        // Storing name in a variable and removing quotes to be used in reply
        args = args.map(arg => arg.replace(/[“”]/g, ""));
        const replyName = args.join(' ');

        // If args is less than 2 then store the first arg and remove the quotes
        if (args.length < 2) {
            name = args[0]
            name = name.replace(/"/g, '');
        }

        // If args is greater than or equal to 2 then join all args into one string, store is as name variable and encode if it is not the first argument and remove quotes
        if (args.length >= 2) {
            name = args.join(' ');
            name = name.replace(/ /g, '%20');
            name = name.replace(/"/g, '');
        }

        // Get summoner data
        const summonerName = await api.getSummoner(name);
        const id = summonerName.id;
        const encryptedId = summonerName.encryptedId;

        // Get match history
        res = await api.getRecentMatchHistory(id);
        const matchId = res.matchId;

        // Get rank
        res = await api.getRank(encryptedId);
        const rank = res.rank;
        const tier = res.tier;

        // Get match stats
        res = await api.getMatchHistory(matchId, id);
        const win = res.win;
        const kill = res.kill;
        const death = res.death;
        const assists = res.assists;

        // If summoner lost and they had more kills than deaths or had more deaths than kills but assists is greater than 8, send a message saying they lost and display their stats and rank
        if (win === false && kill > death) {

            const embed = new Discord.EmbedBuilder()
            .setColor('#0099ff')
            .setTitle("How heavy do you need to be?")
            .setDescription(`WE DON'T END ON A LOSS`)
            .addFields(
                { name: 'Summoner Name', value: `${replyName}`, inline: true },
                { name: 'Rank' , value: `${tier} ${rank}`, inline: true},
                { name: 'K/D/A', value: `${kill}/${death}/${assists}`, inline: true },
            )
            .setTimestamp()
              message.channel.send({ embeds: [embed] });
        }
            
        // If summoner lost and they had more deaths than kills or assists in less than 8, send a message saying they lost and display their stats and rank
        if (win === false && death > kill) {
            
            const embed = new Discord.EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Actually just so bad')
                .setDescription(`WE DON'T END ON A LOSS`)
                .addFields(
                    { name: 'Summoner Name', value: `${replyName}`, inline: true },
                    { name: 'Rank' , value: `${tier} ${rank}`, inline: true},
                    { name: 'K/D/A', value: `${kill}/${death}/${assists}`, inline: true },
                )
                .setTimestamp()

            message.channel.send({ embeds: [embed] });
        }

        // If summoner won and they had more kills than deaths or assists in greater than 8, send a message saying they won and display their stats and rank
        if (win === true && kill > death) {
            
            const embed = new Discord.EmbedBuilder()
                .setColor('#0099ff')
                .setTitle("THAT'S WHAT I LIKE TO SEE. EZ DUBS")
                .setDescription(`TGF 1 MORE!`)
                .addFields(
                    { name: 'Summoner Name', value: `${replyName}`, inline: true },
                    { name: 'Rank' , value: `${tier} ${rank}`, inline: true},
                    { name: 'K/D/A', value: `${kill}/${death}/${assists}`, inline: true },
                )
                .setTimestamp()

            message.channel.send({ embeds: [embed] });
        }

        // If summoner won and they had more deaths than kills and assists in less than 8, send a message saying they won and display their stats and rank
        if (win === true && death > kill) {

            const embed = new Discord.EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Imagine being carried...get better')
                .setDescription(`TGF 1 MORE!`)
                .addFields(
                    { name: 'Summoner Name', value: `${replyName}`, inline: true },
                    { name: 'Rank' , value: `${tier} ${rank}`, inline: true},
                    { name: 'K/D/A', value: `${kill}/${death}/${assists}`, inline: true },
                )
                .setTimestamp()

            message.channel.send({ embeds: [embed] });
        }

        // Else if summoner name is not found, send a message saying that the summoner name was not found
        else if (name === undefined){
            message.channel.send('Imagine typing a wrong summoner name...could never be me.');
        }
    },
};

// Path: util\api.js

const fetch = require('node-fetch');
const { s } = require('@sapphire/shapeshift');
require('dotenv').config();