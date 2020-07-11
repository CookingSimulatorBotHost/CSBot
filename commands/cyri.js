const ids = require('../jsons/ids.json')                                // Includes all IDs
const Discord = require('discord.js')                                   // Imports discord.js

module.exports = {
    name: 'cyri',
    description: 'Can YOU run it?',
    execute(message, args, client) {
        let mEmbed = new Discord.MessageEmbed()
            .setColor('#00ffff')
            .setTitle('Can You run it? Let\'s see!')
            .setAuthor('Cooking Simulator', ids.links.pLogo)
            .setDescription(`Check [this](${ids.links.cyriCS}) awesome site\nto see if you can run this game!`)
            .setThumbnail(ids.links.pCYRI)
            .setTimestamp(new Date)
        message.channel.send(mEmbed)
    }
}