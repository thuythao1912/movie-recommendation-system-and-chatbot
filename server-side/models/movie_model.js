const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timeZone = require("mongoose-timezone");

const movie_model = new Schema(
  {
    movie_id: { type: Number },
    movie_title: { type: String },
    movie_year: { type: Number },
    movie_genres: { type: [String] },
    movie_actors: { type: String },
    movie_producers: { type: String },
    movie_description: { type: [String] },
    movie_trailer: { type: String },
    movie_overview: { type: String },
    movie_images: { type: String },
  },
  { versionKey: false }
);
movie_model.plugin(timeZone);
module.exports = mongoose.model("movie", movie_model);
