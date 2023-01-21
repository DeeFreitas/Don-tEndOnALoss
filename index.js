// Import package
const { Client, GatewayIntentBits } = require('discord.js');
const https = require('https');
const axios = require('axios');
require('dotenv/config');


// Create client object
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
})

// Function to see if the bot is ready
client.on('ready', () => {
    console.log('Bot is ready!');
})

client.on('messageCreate', message => {
    if (message.content.startsWith('!matchHistory')) {
        // Get summoner name and encode it to be used in the request
        const summonerName = message.content.split('"')[1];
        const summonerNameEncoded = encodeURIComponent(summonerName);
        console.log(summonerNameEncoded);

        // Make request to riot api to get summoner puuid and store it
        const summonerEndpoint = "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + summonerNameEncoded + "";
        axios.get(summonerEndpoint, {
            headers: {
                'X-Riot-Token': process.env.API_KEY
            }
        })
        .then(response => {
            
            // Store the puuid
            const puuid = response.data.puuid;

            // Make request to riot api to get match history of most recent game and store it
            const matchHistoryEndpoint = "https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/" + puuid + "/ids?start=0&count=1";
            return axios.get(matchHistoryEndpoint, {
                headers: {
                    'X-Riot-Token': process.env.API_KEY
                }
            });
        })
        .then(response => {
            // Store the match id
            const matchId = response.data[0];

             // Make request for each match history id to get the win/loss of each game
            const matchHistoryEndpoint = "https://europe.api.riotgames.com/lol/match/v5/matches/" + matchId + "";
            return axios.get(matchHistoryEndpoint, {
                headers: {
                    'X-Riot-Token': process.env.API_KEY
                }
            });
        })
        .then(response => {
            // Find summoner name in the response that matches the summoner name that was inputted
            const summonerNameIndex = response.data.info.participants.findIndex(participant => participant.summonerName === summonerName);

            // Store the win/kill/death of the game from stored index
            const win = response.data.info.participants[summonerNameIndex].win;
            const kill = response.data.info.participants[summonerNameIndex].kills;
            const death = response.data.info.participants[summonerNameIndex].deaths;

            // If the player lost send a message to the channel and display summoner name
            if (!win) {
                // if player has more deaths than kills then display a different message
                if (!win && kill < death) {
                    message.reply('You lost your last game ' + summonerName + '! WE DO NOT END ON A LOSS! \nKills: ' + kill + '\nDeaths: ' + death + '\nHOLY SHIT YOU ARE HEAVY AF');
                }
                message.reply('You lost your last game ' + summonerName + '! WE DO NOT END ON A LOSS! \nKills: ' + kill + '\nDeaths: ' + death);
            } else {
                // if player has more deaths than kills then display a different message
                if (win && kill < death) {
                    message.reply('You won your last game ' + summonerName + '! WE END ON A WIN! \nKills: ' + kill + '\nDeaths: ' + death + '\n...but you are heavy af');
                }
                message.reply('You won your last game ' + summonerName + '! WE END ON A WIN! \nKills: ' + kill + '\nDeaths: ' + death);
            }
        })

        .catch(error => {
            console.log(error);
        })
    }
})

client.login(process.env.TOKEN);