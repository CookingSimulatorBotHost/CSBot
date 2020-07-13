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
const prefix = Config.prefix
let lastKenobi = [
    new Date() - 180000,
    "",
    ""
]

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
client.on('message', (message) => {
    // If the author of the recieved message is a bot, return
    if (message.author.bot) {
        return
    }
    
    // Check for words in a message and respond to it, then return
    for (word of ReactMessages) {
        if (message.content.toLowerCase().includes(word)) {
            respond(message, word)
            return
        }
    }

    // If no message matches and the message doesent start with the prefix, return
    if (!message.content.startsWith(prefix)) {
        return
    }

    // Get the command and arguments
    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()

    // If no command matches the recieved command, return
    if (!client.commands.has(command))  {
        message.reply("sorry, I couldn't understand you. Try to use '!help'.\nIf you weren't talking to me, please don't start your message with '!'. :)").then(msg => {
            if (message.channel.type != "dm") {
                setTimeout(stuff => {
                    msg.delete()
                    message.delete()
                }, 10000)
            }
        })
        return
    }
    
    // Try to execute the command
    try {
        client.commands.get(command).execute(message, args, client)
    } catch (e) {
        console.error(e)
        client.guilds.cache.get('493742253345472512').members.cache.get(Config.bot_owner).user.send(`There was an error while handling the request "${message.content}" from "${message.author.username}".`)
        message.reply(`sadly there was an error while executing your request. :(`).then(msg => {
            if (message.channel.type != "dm") {
                setTimeout(stuff => {
                    msg.delete()
                    message.delete()
                }, 10000)
            }
        })
    }
})

function respond(message, word) {
    let mEmbed = new Discord.MessageEmbed()
    switch (word) {
        case ReactMessages[0] :
            mEmbed = new Discord.MessageEmbed()
                .setColor('#00ffff')
                .setTitle('Loading Screen')
                .setAuthor('Cooking Simulator', ids.links.pLogo)
                .setDescription(`If you are stuck in the loading screen, check <#${ids.channels.troubleshooting}>!`)
                .setThumbnail(ids.links.pLoading)
                .setTimestamp(new Date)
            return message.channel.send(mEmbed)
        case ReactMessages[1] :
        case ReactMessages[2] :
            mEmbed = new Discord.MessageEmbed()
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
            return message.channel.send(mEmbed)
        case ReactMessages[4] :
            let emoji = client.emojis.cache.find(emoji => emoji.name === "PepeYikes")
            return message.reply(`this is a secret ${emoji}`)
    }
}

// Gives back a random number
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Login to the bot
client.login(Config.token).then(r => console.log("Successfully logged in!")).catch(err => console.error("Error while trying to log in"));