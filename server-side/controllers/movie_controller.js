var movie_model = require("../models/movie_model");

exports.get_list_movie = (req, res) => {
  movie_model
    .find((err, list) => {
      if (err) {
        console.log(err);
        res.status(500).send(`Something went wrong...`);
      } else {
        res.json(list);
      }
    })
    .catch((err) => {
      res.status(400).send(`Unable to get to database...`);
    });
};

exports.add_list_movie = async (req, res) => {
  list_movie = req.body.list_movie;
  unique_key = req.body.unique_key;
  count = 0;
  for (let i = 0; i < list_movie.length; i++) {
    await movie_model.find(
      { [unique_key]: list_movie[i][unique_key] },
      (err, result) => {
        if (result.length == 0) {
          movie_model.find(
            {
              [unique_key]: {
                $regex: new RegExp(`^${list_movie[i][unique_key]}$`, "i"),
              },
            },
            (err, result) => {
              if (result.length == 0) {
                let item = new movie_model(list_movie[i]);
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
  count > 0
    ? (message = `Movies are added successfully`)
    : (message = `No movie is added`);
  res.status(200).json({ message: message });
};

exports.count_movie = async (req, res) => {
  let count_doc = 0;
  await movie_model.countDocuments((err, result) => {
    count_doc = result;
  });
  res.status(200).json(count_doc);
};
