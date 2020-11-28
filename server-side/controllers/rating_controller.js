var rating_model = require("../models/rating_model");
var movie_model = require("../models/movie_model");
const axios = require("axios");
const utils = require("../utils/utils");
exports.get_list_rating = (req, res) => {
  data_list = [];

  rating_model
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
