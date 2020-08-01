const ids = require('../jsons/ids.json')                        // Includes all IDs
const Discord = require('discord.js')                           // Imports discord

module.exports = {
    name: 'bug',
    description: 'Bug!',
    execute(message, args, client) {
        let mEmbed = new Discord.MessageEmbed()
            .setColor('#00ffff')
            .setTitle('How to report a bug')
            .setDescription(`Please describe your bug as detailed as possible and attach your output_log.txt and your savefile. Check <#${ids.channels.logsAndSaves}> on how to attach these files.`)
            .setThumbnail(ids.links.pBug)
        message.channel.send(mEmbed)
    }
}