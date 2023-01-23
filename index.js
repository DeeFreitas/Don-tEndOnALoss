// Import package
const api = require('./util/ritoapi.js');
const { getRankImg } = require('./util/rankImg.js');
const Discord = require('discord.js');
const path = require ('path');
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

// Login
client.once('ready', () => {
    console.log(`${client.user.tag} is online!`);

    client.user.setPresence({
        status: 'online',
        activity: {
            name: 'Trying to not end on a loss',
            type: 'PLAYING',
        }
    });
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
const summonerNames = ['"No 1 Top"', '"Kidda Soniye"', '"Looking 4 Latina"', '"Kryspy"', '"Mali Manoeuvre"'];

// Match array name to discord names to message them in discord channel
const discordNames = {
    '"No 1 Top"': 'nightmerez#3942',
    '"Kidda Soniye"': 'Fabby#8263',
    '"Looking 4 Latina"': 'Street Fighter Pepe#3142',
    '"Kryspy"': 'krys#5104',
    '"Mali Manoeuvre"': 'JebusCrust#8690',
};

// Run command every hour and post if they ended on a loss
setInterval(() => {
    // Loop through summonerNames array
    summonerNames.forEach(async (name) => {
        // Get summoner data
        const summonerName = await api.getSummoner(name);
        const id = summonerName.id;
        const encryptedId = summonerName.encryptedId;
        const accountId = summonerName.accountId;

        // Get match history data to get last match id
        const matchHistory = await api.getMatchHistory(accountId);
        const matchId = matchHistory.matches[0].gameId;

        // Get match data to see if they ended on a loss
        const match = await api.getMatch(matchId);
        const participantId = match.participantIdentities.find((p) => p.player.accountId === accountId).participantId;
        const participant = match.participants.find((p) => p.participantId === participantId);
        const win = participant.stats.win;

        // If they did not win, send message to channel with their discord name
        if (!win) {
            // send in general channel by channel id
            const channel = client.channels.cache.get('756891903378587685');
            
            const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                // message discord name from discordNames object
                .setTitle('Loss Alert' + ' ' + discordNames[name] + ' ' + 'ended on a loss!')
                .setURL('https://euw.op.gg/summoner/userName=' + name)
                .setDescription('You know what that means 🙂')
                .addFields(
                    { name: 'Summoner Name', value: `${replyName}`, inline: true },
                    { name: 'Rank' , value: `${tier} ${rank}`, inline: true},
                    { name: 'K/D/A', value: `${kill}/${death}/${assists}`, inline: true },
                )
                .setImage(rankImg)
                .setTimestamp()

            channel.send({ embeds: [embed] });
        }
    });
}, 3600000);

client.on('messageCreate', (message) => {
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
});

client.login(process.env.TOKEN);