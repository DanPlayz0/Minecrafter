const Command = require('@structures/framework/Command');
const Fuse = require('fuse.js');

const achievementItems = [
  'arrow', 'bed', 'bone', 'book',
  'bow', 'bread', 'cake', 'chest',
  'coal', 'cobweb', 'cookie', 'crafting_table',
  'creeper', 'creeper_spawn_egg', 'diamond', 'diamond_boots',
  'diamond_chestplate', 'diamond_sword', 'empty_bucket', 'fire', 
  'flint_and_steel', 'furnace', 'gold_ingot',
  'grass_block', 'heart', 'iron_chestplate', 'iron_door',
  'iron_ingot', 'iron_sword', 'lava_bucket', 'milk_bucket',
  'oak_door', 'oak_log', 'oak_planks',
  'pig', 'rail', 'redstone', 'sign',
  'splash_potion', 'stone', 'tnt', 'water_bucket',
  'water_potion', 'wooden_hoe', 'wooden_sword'
];;

const fuse = new Fuse(achievementItems.map((m,i) => ({ name: m.replace(/_/g, ' ').toProperCase(), id: m})), {
  shouldSort: true,
  threshold: 0.5,
  location: 0,
  distance: 80,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ['name', 'id'],
  id: 'id'
})

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      enabled: true,
      description: "Generate an achievement",
      options: [
        {
          type: 'STRING',
          name: 'item',
          description: 'A minecraft item',
          required: true,
          autocomplete: true,
        },
        {
          type: 'STRING',
          name: 'message',
          description: 'The achievement message',
          required: true,
        },
        {
          type: 'STRING',
          name: 'title',
          description: 'The title message',
          required: false,
          choices: [
            'Achievement Get!',
            'Advancement Get!',
            'Challenge Complete!',
          ].map(m => ({ name: m, value: m }))
        },
      ]
    })

    this.runInteraction = this.runMessage = this.run;
  }

  async run(ctx) {
    const achievementItem = ctx.args.getString('item'), achievementMessage = ctx.args.getString('message'), achievementTitle = ctx.args.getString('title');
    if(!achievementItems.find(x => x === achievementItem)) return this.itemInvalid(ctx);
    return ctx.sendMsg(new ctx.MessageEmbed().setColor(ctx.client.color.primary).setImage(`https://japi.rest/image/creation/v1/achievement?item=${encodeURIComponent(achievementItem)}&message=${encodeURIComponent(achievementMessage)}&title=${encodeURIComponent(achievementTitle)}${achievementTitle === 'Challenge Complete!' ? '&color=%23F454FD' : ''}`))
  }

  itemInvalid(ctx) {
    return ctx.sendMsg(new ctx.MessageEmbed().setColor(ctx.client.color.primary).setTitle('Invalid Item').setDescription('The achievement item must be selected from the auto-complete.').addField('Supported Items', achievementItems.map(m => '`'+m.toLowerCase().replace(/ /g, '_')+'`').join(', ')))
  }

  runAutocomplete(ctx) {
    const result = fuse.search(ctx.args.getFocused()).slice(0, 25);
    if(!result.length) return [];
    return result.map(m => ({ name: m.item.name, value: m.item.id }));
  }
}