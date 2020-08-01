const ids = require('../jsons/ids.json')                            // Includes all IDs
const Discord = require('discord.js')                               // Imports discord.js

module.exports = {
    name: 'dev',
    description: 'Troubleshooting!',
    execute(message, args, client) {
        let mEmbed = new Discord.MessageEmbed()
            .setColor('#00ffff')
            .setTitle('Troubleshooting')
            .setDescription(`Please make sure you tried all solutions provided in <#${ids.channels.troubleshooting}>. If that doesn't work, try to verify the game file integrity on steam or reinstall the game.`)
            .setThumbnail(ids.links.pDev)
        message.channel.send(mEmbed)
    }
}