const fetch = require('node-fetch');
require ('dotenv').config();

module.exports = {
    async getSummoner(region, name) {
        let response = await fetch(`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${process.env.API_KEY}`);

    let headers = respone.headers;
    let data = await.response.json();
    const puuid = data.puuid;

    return { headers: headers, data: data, puuid: puuid };
    },

    async getRecentMatchHistory(region, puuid) {
        let response = await fetch(`https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=1?api_key=${process.env.API_KEY}/ids?start=0&count=1`);
    
        let headers = response.headers;
        let data = await response.json();
        const matchId = response.data[0];
        
        return { headers: headers, data: data, matchId: matchId };
    },

    async getMatchHistory(region, matchId) {
        let response = await fetch(`https://${region}.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${process.env.API_KEY}`);

        let headers = response.headers;
        let data = await response.json();

        // Find summoner name in the response that matches the summoner name that was inputted
        const summonerNameIndex = response.data.info.participants.findIndex(participant => participant.summonerName === summonerName);

        // Store the win/kill/death of the game from stored index
        const win = response.data.info.participants[summonerNameIndex].win;
        const kill = response.data.info.participants[summonerNameIndex].kills;
        const death = response.data.info.participants[summonerNameIndex].deaths;

        return { headers: headers, data: data, win: win, kill: kill, death: death };
    },
};