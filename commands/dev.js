const ids = require('../jsons/ids.json')                            // Includes all IDs
const Discord = require('discord.js')                               // Imports discord.js

module.exports = {
    name: 'dev',
    description: 'Troubleshooting!',
    execute(rMessage, args) {
        let mEmbed = new Discord.MessageEmbed()
            .setColor('#00ffff')
            .setTitle('Troubleshooting')
            .setAuthor('Cooking Simulator', ids.links.pLogo)
            .setDescription(`Please make sure you tried all solutions provided in <#${ids.channels.troubleshooting}>. If that doesn't work, try to verify the game file integrity on steam or reinstall the game.`)
            .setThumbnail(ids.links.pDev)
            .setTimestamp(new Date)
        rMessage.channel.send(mEmbed)
    }
}