const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timeZone = require("mongoose-timezone");

const message_model = new Schema(
  {
    input: { type: String },
    intent_name: { type: String },
    response: { type: String },
    score: { type: String },
    entities: { type: [Object] },
    condition: { type: { String } },
    description: { type: { String } },
    status: { type: { type: String } },
    created_time: { type: String },
    session: { type: String },
    user: { type: Object },
    timestamp: { type: Date },
  },
  { versionKey: false }
);
message_model.plugin(timeZone);
module.exports = mongoose.model("message", message_model);
