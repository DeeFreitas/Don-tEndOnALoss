// Import package
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

// Message event
client.on('messageCreate', (message) => {
    // If message does not start with prefix or if the author is a bot, return
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;

    // Store all arguments in an array to be used in loss.js
    const args = message.content.slice(PREFIX.length).split(/ +/);

    // Store command name in a variable and convert it to lowercase
    const commandName = args.shift().toLowerCase();
    console.log(args, commandName);
    
    // Get command from commands folder
    const command = 
    client.commands.get(commandName) ||
    client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );

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
    const cooldownAmount = (command.cooldown || 3) * 1000;

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
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('Not gonna lie I inted, talk to the bot admin to fix this');
    }
});

client.login(process.env.TOKEN);