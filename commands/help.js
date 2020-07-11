const ids = require('../jsons/ids.json')                        // Includes all IDs
const Discord = require('discord.js')                           // Imports discord.js

module.exports = {
    name: 'help',
    description: 'Help!',
    execute(message, args, client) {
        let mEmbed = new Discord.MessageEmbed()
            .setColor('#00ffff')
            .setTitle('Public Commands')
            .setAuthor('Cooking Simulator', ids.links.pLogo)
            .setDescription('Commands everyone can use')
            .setThumbnail(ids.links.pLady)
            .addFields(
                { name: '!cyri', value: 'Provides a link to the awesome \'Can You Run It\' site, where you can check if your PC is capable of running this game!'},
                { name: '!bug', value: 'Provides a message on how to report bugs properly.'},
                { name: '!dev', value: 'Provides a message on how to troubleshoot.'},
                { name: '!faq', value: 'Provides a reminder to check the FAQ. ;)'},
                { name: '!time', value: 'When did you join? I forgot.'},
                { name: '!suggest', value: 'Suggest features for the bot.'}
            )
            .setTimestamp(new Date)
        message.channel.send(mEmbed)
        if (message.channel.type != "dm" && message.member.hasPermission('ADMINISTRATOR')) {
            let aEmbed = new Discord.MessageEmbed()
            .setColor('#00ffff')
            .setTitle('Admin Commands')
            .setAuthor('Cooking Simulator', ids.links.pLogo)
            .setDescription('Commands admins can use')
            .setThumbnail(ids.links.pLady)
            .addFields(
                { name: '!rule', value: 'Creates the rule embed message for the rule channel - should only be used one time. (Currently deactivated)'}
            )
            .setTimestamp(new Date)
            message.author.send(aEmbed)
        }
    }
}