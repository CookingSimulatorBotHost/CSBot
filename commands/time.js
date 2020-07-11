const ids = require('../jsons/ids.json')                        // Includes all IDs
const Discord = require('discord.js')                           // Imports discord

module.exports = {
    name: 'time',
    description: 'Returns how much time has passed since the user joined!',
    execute(message, args, client) {
        if (message.channel.type === "dm") return
        
        let mentioned = message.mentions.members.first() != null ? message.mentions.members.first() : "nope"
        let joined
        let clientMember = message.guild.members.cache.get(client.user.id)
        
        // Check if someone was mentioned, if yes, work with that. Otherwise work with the member that executed this command
        if (mentioned != "nope" && mentioned != message.member) {
            // Delete message if pinged user is admin or dev
            if (mentioned.roles.cache.find(role => role.name === "Admin") != null || mentioned.roles.cache.find(role => role.name === "Dev") != null) {
               message.author.send("We don't ping admins or devs for that....")
                message.delete()
                return
            }
            joined = mentioned.joinedAt
            days = Math.round((new Date() - joined) / 1000 / 60 / 60 / 24)
            let mEmbed = new Discord.MessageEmbed()
                .setColor('#ff7f00')
                .setTitle(`${mentioned.user.username} ${mentioned.nickname != null ? "| " + mentioned.nickname : ""}`)
                .setAuthor('Cooking Simulator', ids.links.pLogo)
                .setThumbnail(ids.links.pCat)
                .addFields(
                    {name: "Weird date", value: `${joined.toString().replace('GMT+0200 (Central European Summer Time)', '(UTC+2)')}`},
                    {name: "Better date", value: `${joined.toISOString().replace(/T/, ' ').replace(/\..+/, '')} (UTC+-0)`},
                    {name: "Days passed", value: `${days}`}
                )
                .setTimestamp(new Date)
            message.channel.send(mEmbed)
        } else {
            joined = message.member.joinedAt
            days = Math.round((new Date() - joined) / 1000 / 60 / 60 / 24)
            let mEmbed = new Discord.MessageEmbed()
                .setColor('#ff7f00')
                .setTitle(`**Time is relative**`)
                .setDescription(`*~ ${clientMember.nickname != null ? clientMember.nickname : clientMember.user.username}*`)
                .setAuthor(clientMember.user.username, ids.links.pLogo)
                .setThumbnail(ids.links.pCat)
                .addFields(
                    {name: "Weird date", value: `${joined.toString().replace('GMT+0200 (Central European Summer Time)', '(UTC+2)')}`},
                    {name: "Better date", value: `${joined.toISOString().replace(/T/, ' ').replace(/\..+/, '')} (UTC+-0)`},
                    {name: "Days passed", value: `${days}`}
                )
                .setTimestamp(new Date)
            message.reply(mEmbed)
        }
    }
}