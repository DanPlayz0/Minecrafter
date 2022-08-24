const Command = require('@structures/framework/Command');
module.exports = class extends Command {
  constructor(client) {
    super(client, {
      enabled: true,
      description: 'Ping a Minecraft server.',
      options: [
        {
          type: 'STRING',
          name: 'server_address',
          description: 'The server connection address (IP:PORT)',
          required: true,
        }
      ]
    })

    this.runInteraction = this.runMessage = this.run;
  }

  async run(ctx) {
    let serverIp = ctx.args.getString('server_address'), serverPort = 25565;
    if(!serverIp.includes('.')) return ctx.sendMsg('That is not a valid server address');

    if(serverIp.includes(':')) {
      serverIp = serverIp.split(':').shift();
      serverPort = +serverIp.split(':').pop() || 25565;
    }

    ctx.sendMsg(new ctx.MessageEmbed().setColor(ctx.client.color.primary).setImage(`http://status.mclive.eu/${serverIp}/${serverIp}/${serverPort}/banner.png`));
  }
}