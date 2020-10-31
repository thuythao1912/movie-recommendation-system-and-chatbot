var movie_model = require("../models/movie_model");

exports.get_list_movie = () => {
  result = [];
  result = movie_model.find();
  return result;
};

exports.count_movie = async () => {
  let count_doc = 0;
  await movie_model.countDocuments((err, result) => {
    count_doc = result;
  });
  return count_doc;
};

exports.get_greatest_id = async () => {
  let genre_id = 0;
  movies = await movie_model.find({}, null, { sort: { genre_id: 1 } });
  genre_id = movies[movies.length - 1].movie_id;
  return genre_id;
};

exports.add_list_movie = (data) => {
  console.log(data);
  return "ok";
};
