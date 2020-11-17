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

exports.add_list_movie = async (array_data) => {
  count = 0;
  for (let i = 0; i < array_data.length; i++) {
    await movie_model.find(
      { ["movie_title"]: array_data[i]["movie_title"] },
      (err, result) => {
        if (result.length == 0) {
          movie_model.find(
            {
              ["movie_title"]: {
                $regex: new RegExp(`^${array_data[i]["movie_title"]}$`, "i"),
              },
            },
            (err, result) => {
              if (result.length == 0) {
                let item = new movie_model(array_data[i]);
                item.save().then((item) => {
                  console.log(item);
                  count = count + 1;
                });
              }
            }
          );
        }
      }
    );
  }

  // count > 0
  //   ? (message = `Movies are added successfully`)
  //   : (message = `No movie is added`);
  // console.log(message);
  // return message;
};
