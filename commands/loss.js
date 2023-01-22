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

        // Get match history
        res = await api.getRecentMatchHistory(id);
        const matchId = res.matchId;

        res = await api.getMatchHistory(matchId, id);
        const win = res.win;
        const kill = res.kill;
        const death = res.death;
        const assists = res.assists;

        // Get rank
        const rank = await getRank(id);

        // If summoner lost and they had more kills than deaths or had more deaths than kills but assists is greater than 8, send a message saying they lost and display their stats and rank
        if (win === false && kill > death) {
            // For some reason embed does not work so I am using a regular message for now

            // const embed = new Discord.MessageEmbed()
            // .setColor('#0099ff')
            // .setTitle("How heavy do you need to be?")
            // .setDescription(`WE DON'T END ON A LOSS`)
            // .addFields(
            //     { name: 'Summoner Name', value: `${summonerName}`, inline: true },
            //     { name: 'Rank', value: `${rank}`, inline: true },
            //     { name: 'K/D/A', value: `${kill}/${death}/${assists}`, inline: true },
            // )
            // .setTimestamp()
            //   message.channel.reply({ embed });
            message.reply('Your team was super heavy, feelsbad ' + replyName + '! BUT WE DO NOT END ON A LOSS!\n\n K/D/A: ' + kill + '/' + death + '/' + assists);

        }
            
        // If summoner lost and they had more deaths than kills or assists in less than 8, send a message saying they lost and display their stats and rank
        if (win === false && death > kill) {
            
            // const embed = new Discord.MessageEmbed()
            //     .setColor('#0099ff')
            //     .setTitle('Actually just so bad')
            //     .setDescription(`WE DON'T END ON A LOSS`)
            //     .addFields(
            //         { name: 'Summoner Name', value: `${summonerName}`, inline: true },
            //         { name: 'Rank', value: `${rank}`, inline: true },
            //         { name: 'K/D/A', value: `${kill}/${death}/${assists}`, inline: true },
            //     )
            //     .setTimestamp()

            // message.channel.reply({ embed });

            message.reply('Holy you are actually so bad ' + replyName + '! YOU BEST NOT END ON A LOSS AFTER THAT!\n K/D/A: ' + kill + '/' + death + '/' + assists);
        }

        // If summoner won and they had more kills than deaths or assists in greater than 8, send a message saying they won and display their stats and rank
        if (win === true && kill > death) {
            
            // const embed = new Discord.MessageEmbed()
            //     .setColor('#0099ff')
            //     .setTitle("THAT'S WHAT I LIKE TO SEE. EZ DUBS")
            //     .setDescription(`TGF 1 MORE!`)
            //     .addFields(
            //         { name: 'Summoner Name', value: `${summonerName}`, inline: true },
            //         { name: 'Rank', value: `${rank}`, inline: true },
            //         { name: 'K/D/A', value: `${kill}/${death}/${assists}`, inline: true },
            //     )
            //     .setTimestamp()

            // message.channel.reply({ embed });

            message.reply('THAT\'S WHAT I LIKE TO SEE ' + replyName + '! EZ DUBS!\n K/D/A: ' + kill + '/' + death + '/' + assists);
        }

        // If summoner won and they had more deaths than kills and assists in less than 8, send a message saying they won and display their stats and rank
        if (win === true && death > kill) {

            // const embed = new Discord.MessageEmbed()
            //     .setColor('#0099ff')
            //     .setTitle('Imagine being carried...get better')
            //     .setDescription(`TGF 1 MORE!`)
            //     .addFields(
            //         { name: 'Summoner Name', value: `${summonerName}`, inline: true },
            //         { name: 'Rank', value: `${rank}`, inline: true },
            //         { name: 'K/D/A', value: `${kill}/${death}/${assists}`, inline: true },
            //     )
            //     .setTimestamp()

            // message.channel.reply({ embed });

            message.reply('Imagine being carried ' + replyName + '! GET BETTER!\n K/D/A: ' + kill + '/' + death + '/' + assists);
        }

        // Else if summoner name is not found, send a message saying that the summoner name was not found
        else if (name === undefined){
            message.channel.send('Imagine typing a wrong summoner name...could never be me.');
        }
    },
};

// Path: util\api.js

const fetch = require('node-fetch');
require('dotenv').config();