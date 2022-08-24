const Event = require('@structures/framework/Event');
module.exports = class extends Event {
  constructor(client) {
    super(client, {
      enabled: true,
    });
  }

  async run(client) {
    console.log(`Logged in as ${client.user.tag}`);

    async function setupInit() {
      // Set the game as the "Watching for tags"
      client.user.setActivity(`Minecraft • /help`, { type: "PLAYING" });
    }

    setupInit();
    this.activityInterval = setInterval(setupInit, 90000);

    // Setup the website.
    if(!client.shard || !client.shardId) {
      client.site = new (require("@structures/restapi/index.js"))(client);
      client.site.listen(client.config.restapi.port);
    }
    
    // client.application.commands.set(client.commands.map(m=>m.commandData));
    // if(client.guilds.cache.get('856626398558027776')) client.guilds.cache.get('856626398558027776').commands.set(client.commands.map(m=>m.commandData));
  }
}