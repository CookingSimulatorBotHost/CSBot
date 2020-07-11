const ids = require('../jsons/ids.json')                            // Includes all IDs
const Config = require('../jsons/config.json')                      // Includes config params
const Discord = require('discord.js')                               // Imports discord.js

module.exports = {
    name: 'rule',
    description: 'Set rule message!',
    execute(message, args, client) {
        if (!message.member.hasPermission('ADMINISTRATOR'))
            return
        
        message.user.send(`this command is currently not available, please reach out to the bot owner <@${Config.bot_owner}>.`).catch(err => console.error("DMs off"))
        /*let mEmbed = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('**Rules**')
            .setAuthor('Cooking Simulator', 'http://game-server-reloaded.eu/csLogo.png')
            .setDescription('Please read the rules carefully and then react to unlock access to the discord.')
            .setThumbnail('http://game-server-reloaded.eu/cslady.png')
            .addFields(
                { name: '**Read the #❓faq-please-read before asking.**', value: 'If you\'re new here it is very likely that someone has already asked about the thing you want to ask.'},
                { name: '**Don\'t be a jerk and don\'t swear!**', value: 'Be nice to each other, it\'s just common sense.'},
                { name: '**Whatever you\'re writing, please use the specific channel for that topic.**', value: `For example: Don't report bugs in #👍feedback-and-suggestions or don\'t share memes in <#${ids.channels.dev}>.`},
                { name: '**Do not post any NSFW or 18+ content!**', value: 'Pls just don\'t.'},
                { name: '**If you\'d like to support Cooking Simulator :CSicon: consider leaving it a review on Steam/GOG!**', value: 'Of course it\'s not obligatory but it helps a ton:thumbsup:'},
                { name: '**The developers\' working hours are 9-17CET, Monday - Friday:stopwatch:**', value: 'Please keep that in mind and don\'t get upset, when we don\'t respond immediately to messages sent on Saturday night :pray:'}
            )
            .setTimestamp(new Date)
        message.channel.send(mEmbed).then(sendMessage => sendMessage.react('👌')).catch(console.error)
        message.delete().then(msg => console.log(`Deleted sRule call message from ${msg.author.username}`)).catch(console.error)*/
    }
}