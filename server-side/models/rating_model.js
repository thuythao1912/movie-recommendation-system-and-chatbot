const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timeZone = require("mongoose-timezone");

const rating_model = new Schema(
  {
    user_id: { type: Number },
    movie_id: { type: Number },
    rating_score: { type: Number },
    rating_time: { type: String },
  },
  { versionKey: false }
);
rating_model.plugin(timeZone);
module.exports = mongoose.model("rating", rating_model);
