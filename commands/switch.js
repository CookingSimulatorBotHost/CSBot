const ids = require('../jsons/ids.json')                                // Includes ids.json
const Discord = require('discord.js')                                   // Imports discord.js

module.exports = {
    name: 'switch',
    description: 'Switch',
    execute(message, args, client) {
        let embed = new Discord.MessageEmbed()
            .setColor('#00ffff')
            .setTitle('Switch Support')
            .setDescription(`We currently do not offer technical support for the switch version.`)
            .setThumbnail(ids.links.pBug)
            .addFields(
                { name: `Technical Support`, value: `If you seek technical support for Cooking Simulator on the switch, please reach out to [Forever Entertainment](https://forever-entertainment.com/home,1,en)!`},
                { name: `Game Support`, value: `If you seek game support, f.e. if you want to know a bit about the game, either ask in <#${ids.channels.general}> or in <#${ids.channels.gameplay}>!`}
            )
        message.channel.send(embed)
    }
}