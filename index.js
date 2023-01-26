// Import package
const api = require('./util/ritoapi.js');
const { getChampImg } = require('./util/champImg.js');
const Discord = require('discord.js');
const { dailyRun } = require('./commands/dailyRun.js');
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

// Run command every hour to check if summoner ended on a loss
const cron = require('node-cron');

// Running dailyRun.js every day at 7:15 AM
cron.schedule('22 8 * * *', async () => {
    await dailyRun(client, Discord);
});

// When user calls on command
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