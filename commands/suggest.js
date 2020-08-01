const ids = require('../jsons/ids.json')                                // Includes all IDs
const Discord = require('discord.js')                                   // Imports discord.js

module.exports = {
    name: 'suggest',
    description: 'Suggestion for bot',
    async execute(message, args, client) {
        if (message.content.replace('!suggest', '').trim() === "") return
        let suggestUser
        let guild = client.guilds.cache.get('493742253345472512')
        const member = await guild.members.fetch('731609978611302451').catch(console.error);
        let suggestion = message.content.replace('!suggest ', '')
        let embed = new Discord.MessageEmbed()
            .setColor('#00ffff')
            .setTitle(`Suggestion from ${message.author.username + '#' + message.author.discriminator} in ${message.guild != null ? message.guild.name : 'DMs'}`)
            .setAuthor(`${message.author.username}`, message.author.displayAvatarURL())
            .setDescription(suggestion)
            .setThumbnail(ids.links.pFAQ)
        if (typeof message.attachments.url !== 'undefined' && message.attachments.url !== null) {
            member.user.send(embed)
            member.user.send({files: [message.attachments.first().url]}).then(msg => {
                message.author.send("Your suggestion was sent.")
                if (message.channel.type != "dm") {
                    setTimeout(stuff => {
                        message.delete()
                    }, 10000)
                }
            }).catch(console.error)
        } else {
            member.user.send(embed).then(msg => {
                message.author.send("Your suggestion was sent.")
                if (message.channel.type != "dm") {
                    setTimeout(stuff => {
                        message.delete()
                    }, 10000)
                }
            }).catch(console.error)
        }
    }
}