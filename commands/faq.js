const ids = require('../jsons/ids.json')                            // Includes all IDs
const Discord = require('discord.js')                               // Imports discord.js

module.exports = {
    name: 'faq',
    description: 'FAQ reminder!',
    execute(rMessage, args) {
        let mEmbed = new Discord.MessageEmbed()
            .setColor('#00ffff')
            .setTitle('FAQ - Frequently Asked Questions')
            .setAuthor('Cooking Simulator', ids.links.pLogo)
            .setDescription(`Before asking any questions or writing suggestions, please check <#${ids.channels.faq}> before doing so.`)
            .setThumbnail(ids.links.pFAQ)
            .setTimestamp(new Date)
        rMessage.channel.send(mEmbed)
    }
}