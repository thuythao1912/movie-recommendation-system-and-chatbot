const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timeZone = require("mongoose-timezone");

const movies_model = new Schema(
  {
    movie_id: { type: String },
    movie_title: { type: String },
    movie_year: { type: String },
    movie_genres: { type: [String] },
    movie_actors: { type: String },
    movie_producers: { type: String },
  },
  { timestamps: true }
);
movies_model.plugin(timeZone);
module.exports = mongoose.model("movie", movies_model);
