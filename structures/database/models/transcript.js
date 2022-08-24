const { model, Schema } = require("mongoose");

const modelSchema = new Schema({
  guildId: { type: String, default: null, },
  channelId: { type: String, default: null, },
  
  users: { type: Array, default: [], },
  messages: { type: Array, default: [], },

  startedAt: { type: Date, default: null, },
  endedAt: { type: Date, default: null, },
});

module.exports = {
  schema: modelSchema,
  model: model("transcripts", modelSchema),
};