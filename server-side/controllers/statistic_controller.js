var movie_model = require("../models/movie_model");
var user_model = require("../models/user_model");
var rating_model = require("../models/rating_model");
var genre_model = require("../models/genre_model");

exports.count_docs = async (req, res) => {
  let obj = {};
  await movie_model.countDocuments((err, result) => {
    obj.count_movie = result;
  });
  await rating_model.countDocuments((err, result) => {
    obj.count_rating = result;
  });
  await user_model.countDocuments((err, result) => {
    obj.count_user = result;
  });
  await genre_model.countDocuments((err, result) => {
    obj.count_genre = result;
  });

  res.status(200).json(obj);
};
