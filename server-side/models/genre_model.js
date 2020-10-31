const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timeZone = require("mongoose-timezone");

const genre_model = new Schema(
  {
    genre_id: { type: String },
    genre_name: { type: String },
    genre_description: { type: Array },
  },
  { timestamps: true }
);
genre_model.plugin(timeZone);
module.exports = mongoose.model("genre", genre_model);
