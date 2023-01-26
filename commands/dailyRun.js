const api = require('../util/ritoapi.js');
const { getChampImg } = require('../util/champImg.js');
const Discord = require('discord.js');


// Array of summoner names that will be used to check every hour if they ended on a loss
const summonerNames = ['"No 1 Top"', '"Kidda Soniye"', '"Looking 4 Latina"', '"Kryspy"', '"Mali Manoeuvre"'];

// Match discordName with summonerName to message the user when they end on a loss
const discordName = {
    '"No 1 Top"': 'nightmerez#3942',
    '"Kidda Soniye"': 'Fabby#8263',
    '"Looking 4 Latina"': 'Street Fighter Pepe#3142',
    '"Kryspy"': 'krys#5104',
    '"Mali Manoeuvre"': 'JebusCrust#8690',
}

const dailyRun = async () => {
    console.log('Running job');
    // Loop through summoner names and summonerNames2
    for (let i = 0; i < summonerNames.length; i++) {

        // Remove quotes and “” from summoner names
        const replyName = summonerNames[i].replace(/['"]+/g, '');

        // If summonerName has no spaces then remove quotes
        if (!replyName.includes(' ')) {
            const noQuotes = replyName.replace(/"/g, '');
            summonerNames[i] = noQuotes;
        }

        // Encode summoner name if it has spaces
        if (replyName.includes(' ')) {
            const encodedName = encodeURIComponent(replyName);
            summonerNames[i] = encodedName;
        }

        // Get summoner puuid and encryptedId from getSummoner
        const summoner = await api.getSummoner(summonerNames[i]);
        const id = summoner.data.puuid;
        const encryptedId = summoner.data.id;

        // console log to check if the runner is working
        console.log('Checking if ' + replyName + ' ended on a loss');

        // Get rank data
        const rankData = await api.getRank(encryptedId);
        const tier = rankData.tier;
        const rank = rankData.rank;

        // Get latest match data
        const match = await api.getRecentMatchHistory(id);
        const matchId = match.matchId;

        // Get match data
        const matchData = await api.getMatchHistory(matchId, id);
        const win = matchData.win;
        const kill = matchData.kill;
        const death = matchData.death;
        const assists = matchData.assists;
        const champName = matchData.champ;

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

        // If they did win, send message to channel with their discord name
        if (!win) {
            const embed = new Discord.EmbedBuilder()
                .setColor('#0099ff')
                .setTitle(replyName + ` ended on a loss!`)
                // Encode summonerName again if it has spaces so it can be used in op.gg link
                .setURL(`https://euw.op.gg/summoner/userName=${summonerNames[i]}`)
                .setDescription('You know what that means 🙂')
                .addFields(
                    { name: 'Summoner Name', value: `${replyName}`, inline: true },
                    { name: 'Rank', value: `${tier} ${rank}`, inline: true },
                    { name: 'K/D/A', value: `${kill}/${death}/${assists}`, inline: true },
                )
                .setImage(champImg)
                .setTimestamp()

            // Send message to general channel

            const channel = client.channels.cache.get('756891903378587685');
            channel.send({ embeds: [embed] });

            // Add onto a counter if message is sent
            //counter++;

            // // If counter is 5, send message to channel
            // if (counter === 5) {
            //     const channel = client.channels.cache.get('756891903378587685');
            //     channel.send('5 summoners ended on a loss');
            //     counter = 0;
            // }
        }
    }
    console.log('Finished job');
}