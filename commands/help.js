const Command = require('@structures/framework/Command');
module.exports = class extends Command {
  constructor(client) {
    super(client, {
      enabled: true,
      description: 'Get a list of commands.',
      options: [
        {
          type: 'STRING',
          name: 'command',
          description: 'The full name of the command to view.',
        }
      ]
    })

    this.runInteraction = this.runMessage = this.helpMenu;
  }

  async helpMenu(ctx) {
    const links = [
      {name: 'Invite', link: `${ctx.client.config.domain}/api/invite`},
      {name: 'Support', link: `${ctx.client.config.supportServerInvite}`},
      {name: 'Terms', link: `${ctx.client.config.links.terms}`},
      {name: 'Privacy', link: `${ctx.client.config.links.privacy}`},
    ];

    ctx.sendMsg(new ctx.MessageEmbed()
      .setTitle('Minecrafter - Help').setColor(ctx.client.color.primary)
      .setDescription(links.map(m=>`[${m.name}](${m.link})`).join(' | '))
      .addField('Commands', ctx.client.commands.map(c => `\`${ctx.prefix}${c.commandData.name}${c.commandData.options.length>0?' ':''}${c.commandData.options.map(m=>m.required?`<${m.name}>`:`[${m.name}]`).join(' ')}\` - ${c.commandData.description}`).join('\n'))
    );
  }
}