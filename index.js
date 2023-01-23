// Import package
const api = require('./util/ritoapi.js');
const { getChampImg } = require('./util/champImg.js');
const Discord = require('discord.js');
const path = require('path');
const fs = require('fs');
require('dotenv/config');

// Call the constants/constants.js file and get the prefix and resolve the path
const { PREFIX } = require(path.resolve('./constants/constants.js'));

// Create client object
const client = new Discord.Client({
    shards: "auto",
    allowedMentions: {
        parse: [],
        repliedUser: false,
    },
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent,
    ],
});

// Call on commands and create cooldown variable
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();

// Login and set status
client.once('ready', () => {
    console.log(`${client.user.tag} is online!`);

    // Set status
    client.user.setActivity('Trying to not end on a loss', { type: 'LISTENING' });
});

client.once('reconnecting', () => {
    console.log(`${client.user.tag} is reconnecting!`);
});

client.once('disconnect', () => {
    console.log(`${client.user.tag} is disconnected!`);
});

// Read commands folder
const commandFiles = fs
    .readdirSync(path.join('./commands'))
    .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(path.resolve(`./commands/${file}`))
    client.commands.set(command.name, command);
}

// Array of summoner names that will be used to check every hour if they ended on a loss
const summonerNames = ['"No 1 Top"' '"Kidda Soniye"', '"Looking 4 Latina"', '"Kryspy"', '"Mali Manoeuvre"'];
const summonerNames2 = ['"No 1 Top"' '"Kidda Soniye"', '"Looking 4 Latina"', '"Kryspy"', '"Mali Manoeuvre"'];

// Match array name to discord names to message them in discord channel
const discordNames = {
    '"No 1 Top"': 'nightmerez#3942',
    '"Kidda Soniye"': 'Fabby#8263',
    '"Looking 4 Latina"': 'Street Fighter Pepe#3142',
    '"Kryspy"': 'krys#5104',
    '"Mali Manoeuvre"': 'JebusCrust#8690',
};

// Run command every hour to check if summoner ended on a loss
const cron = require('node-cron');

// Running job at 7am everyday
cron.schedule('0 7 * * *', async () => {
    console.log('Running job');
    // Loop through summoner names
    for (let i = 0; i < summonerNames.length; i++) {

        // Remove quotes and “” from summoner names
        const replyName = summonerNames[i].replace(/['"]+/g, '');

        // If summonerName has no spaces then remove quotes
        if (!replyName.includes(' ')) {
            const noQuotes = replyName.replace(/"/g, '');
            summonerNames[i] = noQuotes;
            summonerNames2[i] = noQuotes;
        }

        // Encode summoner name if it has spaces
        if (replyName.includes(' ')) {
            const encodedName = encodeURIComponent(replyName);
            summonerNames[i] = encodedName;
            summonerNames2[i] = encodedName;
        }

        // Get summoner puuid and encryptedId from getSummoner
        const summoner = await api.getSummoner(summonerNames[i]);
        const id = summoner.data.puuid;
        const encryptedId = summoner.data.id;

        // Remove encoded name from summonerNames so we can display in console
        if (summonerNames[i].includes('%20')) {
            const decodedName = decodeURIComponent(summonerNames[i]);
            summonerNames[i] = decodedName;
        }

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
        if (win === true) {
            const embed = new Discord.EmbedBuilder()
                .setColor('#0099ff')

                // Using reply name so it can be displayed with spaces
                .setTitle(replyName + ' has ended on a loss!')
                .setURL('https://euw.op.gg/summoner/userName=' + summonerNames2)
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
});
client.on('messageCreate', (message) => {
    // Store name of user who sent message
    const name = message.author.username;

    // If message does not start with prefix or is sent by a bot, return
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;

    // Store all arguments in an array to be used in loss.js
    const args = message.content.slice(PREFIX.length).split(/ +/);

    // Store command name in a variable and convert it to lowercase
    const commandName = args.shift().toLowerCase();
    console.log(args, commandName);

    // Get command from commands folder
    const command = client.commands.get(commandName)
    client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    // If user types command that does not exist then reply with message
    if (!client.commands.has(commandName)) {    
        return message.reply(`I beg you fix your message ${message.author}...\nThis is how you use it you pleb: \`${PREFIX}loss? "Summoner Name"\``);
    }

    // If command does not exist, return
    if (!command) return;

    if (command.args && !args.length) {
        let reply = `I beg you fix your message, ${message.author}!`;

        if (command.usage) {
            reply += `\nIf you were smart you'd use this: \`${PREFIX}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
    }

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);

    // Cooldown amount in seconds (3 seconds)
    const cooldownAmount = (command.cooldown || 300) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(
                `My guy you need to wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`
            );
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
        command.execute(message, args, client, Discord);
    } catch (error) {
        console.error(error);
        message.reply('Not gonna lie I inted, talk to the bot admin to fix this');
    }

    // Log in console who sent the message and what command they used
    console.log(`${message.author.username} used command: ${commandName}`);
});

client.login(process.env.TOKEN);