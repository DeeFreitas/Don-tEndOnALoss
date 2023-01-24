const Discord = require('discord.js');
const api = require('../util/ritoapi.js');
const { getChampImg } = require('../util/champImg.js');

module.exports = {
    name: 'loss?',
    description: 'Check if you ended on a loss',
    args: true,
    usage: 'loss? "[summoner name]"',
    async execute(message, args) {
        // Creating name variable
        let name = '';

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
        const index = res.index;
        const win = res.win;
        const kill = res.kill;
        const death = res.death;
        const assists = res.assists;
        const champName = res.champ;

        // champNameImg stores champName uppercase
        let champNameImg = champName.toUpperCase();

        // if champName has space then remove
        if (champNameImg.includes(' ')) {
            const noSpace = champNameImg.replace(/ /g, '');
            champNameImg = noSpace;
        }
        // If champName has ' then remove
        if (champNameImg.includes('\'')) {
            const noApostrophe = champNameImg.replace(/'/g, '');
            champNameImg = noApostrophe;
        }

        // If champName has '.' then remove
        if (champNameImg.includes('.')) {
            const noPeriod = champNameImg.replace(/\./g, '');
            champNameImg = noPeriod;
        }

        // If champ name has '&' then remove
        if (champNameImg.includes('&')) {
            const noAmpersand = champNameImg.replace(/&/g, '');
            champNameImg = noAmpersand;
        }

        // Get champ image using champNameImg
        const champImg = getChampImg(champNameImg);

        // If index is 0, send a message saying cannot record their last game
        if (index === 0) {
            const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Hmm...seems like you have not played a game recently')
            .setDescription(`Gotta get those games in!`)
            .setURL(`https://euw.op.gg/summoner/userName=${name}`)
            .setTimestamp()

            message.channel.send({ embeds: [embed] });
        }
            

        // If summoner lost and they had more kills than deaths or had more deaths than kills but assists is greater than 8, send a message saying they lost and display their stats and rank
        if (win === false && kill > death) {

            const embed = new Discord.EmbedBuilder()
            .setColor('#0099ff')
            .setTitle("Looks like your team inted you...")
            .setDescription(`WE DON'T END ON A LOSS`)
            .addFields(
                { name: 'Summoner Name', value: `${replyName}`, inline: true },
                // Display rank with getRank image
                { name: 'Rank' , value: `${tier} ${rank}`, inline: true},
                { name: 'K/D/A', value: `${kill}/${death}/${assists}`, inline: true },
            )
            .setImage(champImg)
            .setURL(`https://euw.op.gg/summoner/userName=${name}`)
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
                .setImage(champImg)
                .setURL(`https://euw.op.gg/summoner/userName=${name}`)
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
                .setImage(champImg)
                .setURL(`https://euw.op.gg/summoner/userName=${name}`)
                .setTimestamp()

            message.channel.send({ embeds: [embed] });
        }

        // If summoner won and they had more deaths than kills and assists in less than 8, send a message saying they won and display their stats and rank
        if (win === true && death > kill) {

            const embed = new Discord.EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Imagine being carried...get better')
                .setDescription(`Personally I would not take this as a win but whatever`)
                .addFields(
                    { name: 'Summoner Name', value: `${replyName}`, inline: true },
                    { name: 'Rank' , value: `${tier} ${rank}`, inline: true},
                    { name: 'K/D/A', value: `${kill}/${death}/${assists}`, inline: true },
                )
                .setImage(champImg)
                .setURL(`https://euw.op.gg/summoner/userName=${name}`)
                .setTimestamp()

            message.channel.send({ embeds: [embed] });
        }

        // Else if summoner name is not found, send a message saying that the summoner name was not found
        else if (name === undefined){
            message.channel.send('Imagine typing a wrong summoner name...could never be me.');
        }

        // Try catch to catch any 404, 500, 401 errors from the API and send a message saying that the API is down
        try {
            const res = await fetch(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${process.env.API_KEY}`);
            const json = await res.json();

            if (json.status.status_code === 404 || json.status.status_code === 500 || json.status.status_code === 401) {
                message.channel.send('The API is down, try again later.');
            }
        } catch (error) {
            console.log(error);
        }
    }
};

// Path: util\api.js

const fetch = require('node-fetch');
const { s } = require('@sapphire/shapeshift');
require('dotenv').config();