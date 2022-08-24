const Command = require('@structures/framework/Command');
module.exports = class extends Command {
  constructor(client) {
    super(client, {
      enabled: true,
      description: 'Minecraft Color Codes',
      options: []
    })
  }

  async runInteraction(ctx) {
    ctx.sendMsg(new ctx.MessageEmbed()
      .setTitle('Color Codes').setURL('https://minecraft.fandom.com/wiki/Formatting_codes')
      .setImage('https://discord.mx/wBpYu27eKP.png').setColor(ctx.color.primary))
  }
}