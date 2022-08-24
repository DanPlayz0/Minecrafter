const Command = require('@structures/framework/Command');

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      enabled: false,
      description: "Test your minecraft knowledge",
      options: []
    })

    this.runInteraction = this.runMessage = this.run;
  }

  async run(ctx) {
    const achievementItem = ctx.args.getString('item'), achievementMessage = ctx.args.getString('message');
    if(!achievementItems.find(x => x.toLowerCase().replace(/ /g, '_') === achievementItem)) return this.itemInvalid(ctx);
    return ctx.sendMsg(new ctx.MessageEmbed().setColor(ctx.client.color.primary).setImage(`https://japi.rest/image/creation/v1/acheivement?item=${encodeURIComponent(achievementItems.findIndex(x => x.toLowerCase().replace(/ /g, '_') === achievementItem))}&message=${encodeURIComponent(achievementMessage)}`))
  }
}