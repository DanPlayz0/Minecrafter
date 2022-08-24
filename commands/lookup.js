const Command = require('@structures/framework/Command');
module.exports = class extends Command {
  constructor(client) {
    super(client, {
      enabled: true,
      description: "Get a player\'s past usernames",
      options: [
        {
          type: 'STRING',
          name: 'player',
          description: 'A minecraft account username or uuid',
          required: true,
        }
      ]
    })

    this.runInteraction = this.runMessage = this.run;
  }

  async run(ctx) {
    const player = ctx.args.getString('player');
    const data = await ctx.client.fetch.get(`https://japi.rest/minecraft/v1/history/${player}`).then(m => m.data).catch(err => ({ data: err.response.data }));
    if(data.fetchError) return ctx.sendMsg(new ctx.MessageEmbed().setColor(ctx.client.color.primary).setDescription('An error occured while trying to fetch that player.'));
    if(data.data.error) return ctx.sendMsg(new ctx.MessageEmbed().setColor(ctx.client.color.primary).setDescription('Player not found'));

    return ctx.sendMsg(new ctx.MessageEmbed().setColor(ctx.client.color.primary).setDescription(data.data.map((past,i) => `${i+1}. ${data.data.length-1===i?`**${past.name}**`:past.name} [${past.changedToAt ? `<t:${past.changedToAt/1000}:d>` : 'Original Name'}]`).join('\n')))
  }
}