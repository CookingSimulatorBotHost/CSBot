// Requiring files
const fs = require('fs')                                            // Imports Filereader
const Config = require('./jsons/config.json')                       // Includes config params
const ReactMessages = require('./jsons/reactMessages.json')         // Includes words that the bot should react to
const ids = require('./jsons/ids.json')                             // Includes all IDs
const Discord = require('discord.js')                               // Imports discord.js

// Defining Client
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })

// Fetching Commands
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
}

// Global Variables
const prefix = Config.prefix;
let lastKenobi = new Date() - 180000;

// What should the bot do once its ready
client.on('ready', () => {
    client.user.setPresence({
        status: 'online',
        activity: {
            name: 'Cooking Simulator'
        }
    }).then(console.log).catch(console.error)
})

// What should the bot do once it recieves a message
client.on('message', (rMessage) => {
    // If the author of the recieved message is a bot, return
    if (rMessage.author.bot) {
        return
    }
    
    // Check for words in a message and respond to it, then return
    if (rMessage.content.toLowerCase().includes(ReactMessages.kenobi)) {
        kenobi(rMessage)
        return
    } else if (rMessage.content.toLowerCase().includes(ReactMessages.loadingScreen)) {
        respondLS(rMessage)
        return
    } else if (rMessage.content.toLowerCase().includes(ReactMessages.botUsage) || rMessage.content.toLowerCase().includes(ReactMessages.botUsage2)) {
        respondUsage(rMessage)
        return
    }

    // If no message matches and the message doesent start with the prefix, return
    if (!rMessage.content.startsWith(prefix)) {
        return
    }

    // Get the command and arguments
    const args = rMessage.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()

    // If no command matches the recieved command, return
    if (!client.commands.has(command))  {
        rMessage.channel.send("Sorry, I couldn't understand you. Try to use '!help'.\nIf you weren't talking to me, please don't start your message with '!'. :)")
        return
    }
    
    // Try to execute the command
    try {
        client.commands.get(command).execute(rMessage, args)
    } catch (e) {
        console.error(e)
        rMessage.guild.users.cache.get(Config.bot_owner).send(`There was an error while handling the request "${rMessage.content}".`)
        rMessage.reply(`Sadly, there was an error while executing your request. :(`)
    }
})

/*client.on('messageReactionAdd', async (rReaction, user) => {
    if (user.bot)
        return 
    try {
        if (rReaction.message.partial)
            await rReaction.message.fetch();
    } catch (e) {
        console.log("Error: " + e)
    }
    let guild = rReaction.message.guild
    guild.members.fetch(user).then(member => {
        if (!member.roles.cache.find(r => r.name === "Clone")) {
            member.roles.add(guild.roles.cache.find(role => role.name === "Clone"))
            rReaction.users.remove(member.user)
        } else
            rReaction.users.remove(member.user)
    })
})*/

// Ah yes, our great master, General Kenobi 
function kenobi(rMessage) {
    if (((new Date()) - lastKenobi) < 180000) {
        return
    }
    rMessage.channel.send({files: [ids.kenobi[randomInteger(0, ids.kenobi.length - 1)]]})
    lastKenobi = Date.now()
}

// Respond with a message that links to the troubleshooting channel, if the message contains "loading screen"
function respondLS(rMessage) {
    let mEmbed = new Discord.MessageEmbed()
        .setColor('#00ffff')
        .setTitle('Loading Screen')
        .setAuthor('Cooking Simulator', ids.links.pLogo)
        .setDescription(`If you are stuck in the loading screen, check <#${ids.channels.troubleshooting}>!`)
        .setThumbnail(ids.links.pLoading)
        .setTimestamp(new Date)
    rMessage.channel.send(mEmbed)
}

// Respond with a message that explains the usage of this bot
function respondUsage(rMessage) {
    let mEmbed = new Discord.MessageEmbed()
        .setColor('#00ffff')
        .setTitle('Bot Usage')
        .setAuthor('Cooking Simulator', ids.links.pLogo)
        .setThumbnail(ids.links.pLady)
        .addFields(
            { name: "Prefix", value: `The prefix of this bot is '**${Config.prefix}**'`},
            { name: "Usage", value: `To use the bot, type '**${Config.prefix}<Command>**'`},
            { name: "Example", value: `${Config.prefix}help`}
        )
        .setTimestamp(new Date)
    rMessage.channel.send(mEmbed)
}

// Gives back a random number
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Login to the bot
client.login(Config.token).then(r => console.log("Successfully logged in!"));