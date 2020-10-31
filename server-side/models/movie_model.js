const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timeZone = require("mongoose-timezone");

const movie_model = new Schema(
  {
    movie_id: { type: String, uniqueCaseInsensitive: true },
    movie_title: { type: String, uniqueCaseInsensitive: true },
    movie_year: { type: String },
    movie_genres: { type: [String] },
    movie_actors: { type: String },
    movie_producers: { type: String },
  },
  { timestamps: true }
);
movie_model.plugin(timeZone);
module.exports = mongoose.model("movie", movie_model);
