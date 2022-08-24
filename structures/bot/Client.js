const Discord = require('discord.js');

module.exports = class BotClient extends Discord.Client {
  constructor(options) {
    super(options);

    // Configuration
    this.config = require('@root/config');

    // Collections
    for (const name of ["commands", "events", "cooldowns"]) this[name] = new Discord.Collection();

    // Packages
    this.discord = Discord;
    this.fs = require('fs');
    this.moment = require('moment'); require("moment-timezone"); require("moment-duration-format");
    this.duration = require("humanize-duration");
    this.hashids = require('hashids');
    this.fetch = require('axios');

    // Bot Colors
    this.color = {
      "primary": "#0b942b",
      "secondary": "#05651B",
      "success": "GREEN",
      "error": 'RED',
      "warning": 'ORANGE',
      "info": 'BLUE',
    };
    
    // Miscelaneous
    this.services = {
      record: new (require('@structures/services/Record.js'))(this),
    };
    this.database = new (require('@structures/database/Database.js'))(this);
    this.redis = new (require('ioredis'))(`redis://${this.config.redis.host}:${this.config.redis.port}`);
    this.webhooks = new (require('@structures/webhooks/WebhookManager.js'))(this);
    this.loader = new (require('./Loader.js'))(this);

    this.loader.start();
  }
}