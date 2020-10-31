var genre_model = require("../models/genre_model");

exports.get_list_genre = (req, res) => {
  genre_model
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

exports.add_list_genre = (req, res) => {
  list_genre = req.body.list_genre;
  unique_key = req.body.unique_key;
  count = 0;
  for (let i = 0; i < list_genre.length; i++) {
    genre_model.find(
      { [unique_key]: list_genre[i][unique_key] },
      (err, result) => {
        if (result.length == 0) {
          movie_model.find(
            {
              [unique_key]: {
                $regex: new RegExp(`^${list_genre[i][unique_key]}$`, "i"),
              },
            },
            (err, result) => {
              if (result.length == 0) {
                let item = new genre_model(list_genre[i]);
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
    ? (message = `Genres are added successfully`)
    : (message = `No genre is added`);
  res.status(200).json({
    message: message,
  });
};

exports.count_genre = async (req, res) => {
  let count_doc = 0;
  await genre_model.countDocuments((err, result) => {
    count_doc = result;
  });
  res.status(200).json(count_doc);
};
