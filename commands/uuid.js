const Command = require('@structures/framework/Command');
module.exports = class extends Command {
  constructor(client) {
    super(client, {
      enabled: true,
      description: "Get a player\'s UUID",
      options: [
        {
          type: 'STRING',
          name: 'username',
          description: 'A minecraft account username',
          required: true,
        }
      ]
    })

    this.runInteraction = this.runMessage = this.run;
  }

  async run(ctx) {
    const username = ctx.args.getString('username');
    const data = await ctx.client.fetch.get(`https://japi.rest/minecraft/v1/username/${username}`).then(m => m.data).catch(err => ({ data: err.response.data }));
    if(data.fetchError) return ctx.sendMsg(new ctx.MessageEmbed().setColor(ctx.client.color.primary).setDescription('An error occured while trying to fetch that player.'));
    if(!data.data) return ctx.sendMsg(new ctx.MessageEmbed().setColor(ctx.client.color.primary).setDescription('Player not found'));

    return ctx.sendMsg(new ctx.MessageEmbed().setColor(ctx.client.color.primary).setDescription(`UUID for **${username}**\n\`${data.data.id}\``))
  }
}