var genre_model = require("../models/genre_model");

exports.get_list_genre = () => {
  result = [];
  result = genre_model.find();
  return result;
};

exports.count_genre = () => {
  let count_doc = 0;
  count_doc = genre_model.countDocuments((err, result) => {
    count_doc = result;
  });
  return count_doc;
};
