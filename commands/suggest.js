const ids = require('../jsons/ids.json')                                // Includes all IDs
const Discord = require('discord.js')                                   // Imports discord.js

module.exports = {
    name: 'suggest',
    description: 'Suggestion for bot',
    execute(message, args, client) {
        let suggestUser
        if (message.channel.type === "dm") {
            suggestUser = client.guilds.cache.get('632613831301922866').members.cache.get('731609978611302451').user
        } else {
            suggestUser = message.guild.members.cache.get('731609978611302451').user
        }
        let suggestion = message.content.replace('!suggest ', '')
        let embed = new Discord.MessageEmbed()
            .setColor('#00ffff')
            .setTitle(`Suggestion from ${message.author.username + '#' + message.author.discriminator} in ${message.guild != null ? message.guild.name : 'DMs'}`)
            .setAuthor(`${message.author.username}`, message.author.displayAvatarURL())
            .setDescription(suggestion)
            .setThumbnail(ids.links.pFAQ)
            .setTimestamp(new Date)
        if (typeof message.attachments.url !== 'undefined' && message.attachments.url !== null) {
            suggestUser.send(embed)
            suggestUser.send({files: [message.attachments.first().url]}).then(msg => {
                message.author.send("Your suggestion was send.")
                if (message.channel.type != "dm") {
                    setTimeout(stuff => {
                        message.delete()
                    }, 10000)
                }
            }).catch(console.error)
        } else {
            suggestUser.send(embed).then(msg => {
                message.author.send("Your suggestion was send.")
                if (message.channel.type != "dm") {
                    setTimeout(stuff => {
                        message.delete()
                    }, 10000)
                }
            }).catch(console.error)
        }
    }
}