var rating_model = require("../models/rating_model");
var movie_model = require("../models/movie_model");
const axios = require("axios");
const utils = require("../utils/utils");
exports.get_list_rating = (req, res) => {
  movie_name = [];
  let queries = req.query;
  console.log(queries);
  rating_model
    .find(queries, async (err, list) => {
      if (err) {
        console.log(err);
        res.status(500).send(`Something went wrong...`);
      } else {
        for (let i = 0; i < list.length; i++) {
          await movie_model.findOne(
            { movie_id: list[i].movie_id },
            (err, movie) => {
              movie_name.push(movie.movie_title);
            }
          );
        }
        res.json([list, movie_name]);
      }
    })
    .catch((err) => {
      res.status(400).send(`Unable to get to database...`);
    });
};

exports.count_rating = async (req, res) => {
  let count_doc = 0;
  await rating_model.countDocuments((err, result) => {
    count_doc = result;
  });
  res.status(200).json(count_doc);
};
