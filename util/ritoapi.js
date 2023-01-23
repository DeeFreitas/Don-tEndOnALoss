const fetch = require('node-fetch');
require('dotenv').config();

module.exports = {
    async getSummoner(name) {

        // Fetch summoner data from Riot API and store the puuid in a variable to be used inn the next function
        let response = await fetch(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${process.env.API_KEY}`);

        let headers = response.headers;
        let data = await response.json();
        const id = data.puuid;
        const encryptedId = data.id;

        // Store the summoner name in a variable
        const summonerName = data.name;

        return { headers, data, id, encryptedId };
    },

    // Fetch match history id from Riot API and store the match id in a variable
    async getRecentMatchHistory(id) {
        let response = await fetch(`https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${id}/ids?start=0&count=1&api_key=${process.env.API_KEY}`);

        let headers = response.headers;
        let data = await response.json();
        const matchId = data[0];

        return { headers, matchId, id };
    },

    // Fetch rank from Riot API and store the rank in a variable
    async getRank(encryptedId) {
        let response = await fetch(`https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${encryptedId}?api_key=${process.env.API_KEY}`);

        let headers = response.headers;
        let data = await response.json();

        // If data does not contain entry for tier or rank, set it to Unranked
        if (!data || !data[0] || !data[0].tier || !data[0].rank) {
            data[0] = { tier: 'Unranked', rank: '' };
        }

        // Else store the tier and rank in a variable
        const tier = data[0].tier;
        const rank = data[0].rank;

        return { headers, rank, tier };
    },

    // Fetch match history from Riot API and store the win/kill/death/assists of the game from stored index
    async getMatchHistory(matchId, id) {
        let response = await fetch(`https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${process.env.API_KEY}`);

        let headers = response.headers;
        let data = await response.json();

        // If there is no data, set all variables to 0
        if (!data) {
            data = { info: { participants: [{ index: 0, win: 0, kills: 0, deaths: 0, assists: 0 }] } };
        }
        // Else store the index, win, kill, death, assists in a variable

        const index = data.info.participants.findIndex(participant => participant.puuid === id);

        const win = data.info.participants[index].win;
        const kill = data.info.participants[index].kills;
        const death = data.info.participants[index].deaths;
        const assists = data.info.participants[index].assists;
        const champ = data.info.participants[index].championName;


        return { headers, win, kill, death, assists, champ };

        if (!response.ok) {
            throw new Error(`Guess either I'm trash or Riot sucks...Status: ${response.status}`);
        }
    },
};