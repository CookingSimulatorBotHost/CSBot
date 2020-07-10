const Package = require('../package.json')                              // Includes package.json
const Discord = require('discord.js')                                   // Imports discord.js

module.exports = {
    name: 'v',
    description: 'Version',
    execute(rMessage, args) {
        rMessage.reply(`hey there. There current version of this bot is v${Package.version}!`)
    }
}