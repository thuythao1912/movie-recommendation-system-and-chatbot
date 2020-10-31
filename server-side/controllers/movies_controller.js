var movies_model = require("../models/movies_model");
//add
exports.add_one_movie = (req, res) => {
  console.log(req.body);
  let item = new movies_model(req.body);
  item
    .save()
    .then((item) => {
      res.status(200).json({ data: "movie is added successfully", item });
    })
    .catch((err) => {
      res.status(400).send("unable to save to database");
    });
};
