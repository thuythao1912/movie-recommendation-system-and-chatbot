var movie_model = require("../models/movie_model");
const axios = require("axios");
const global_var = require("../global_variables");
const utils = require("../utils/utils");

exports.get_list_movie = (req, res) => {
  let queries = req.query;
  console.log(queries);
  movie_model
    .find(queries, (err, list) => {
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
  let movie_id = await utils.get_greatest_id("movies", "movie_id");
  let list_movie = req.body.data;
  let movie_success = 0;
  let movie_fail = 0;
  let message = "";
  let onComplete = () => {
    if (movie_success > 0) {
      message += `${movie_success}/${list_movie.length} phim đã được thêm thành công!\n`;
    }
    if (movie_fail > 0) {
      message += `${movie_fail}/${list_movie.length} phim thêm thất bại!`;
    }
    axios.put(`${global_var.SERVER_PYTHON}`);
    res.status(200).json({ message: message });
  };
  let tasksToGo = list_movie.length;
  if (tasksToGo === 0) {
    onComplete();
  } else {
    await list_movie.map((movie, key) => {
      movie_model.find({ movie_title: movie.movie_title }, (err, result) => {
        console.log(result);
        if (result.length == 0) {
          movie_model.find(
            {
              movie_title: {
                $regex: new RegExp(`^${movie.movie_title}$`, "i"),
              },
            },
            (err, result) => {
              if (result.length == 0) {
                let item = new movie_model(movie);
                item.movie_id = movie_id;
                item.save();
                movie_success++;
                if (--tasksToGo === 0) {
                  onComplete();
                }
              } else {
                movie_fail++;
                if (--tasksToGo === 0) {
                  onComplete();
                }
              }
            }
          );
        } else {
          movie_fail++;
          if (--tasksToGo === 0) {
            onComplete();
          }
        }
      });
    });
  }
};

exports.count_movie = async (req, res) => {
  let count_doc = 0;
  await movie_model.countDocuments((err, result) => {
    count_doc = result;
  });
  res.status(200).json(count_doc);
};

exports.get_greatest_movie_id = async (req, res) => {
  let movie_id = 0;
  movies = await movie_model.find({}, null, { sort: { movie_id: 1 } });
  id = [];
  movies.forEach((movie) => {
    id.push(parseInt(movie.movie_id));
  });
  movie_id = Math.max.apply(Math, id);
  res.status(200).json(movie_id);
};

exports.delete_one_movie = (req, res) => {
  movie_model.findByIdAndDelete(req.params.id, (err, movie) => {
    if (err) {
      res.json({ message: "Phim đã xóa thất bại!" });
    } else {
      axios.put(`${global_var.SERVER_PYTHON}`);
      res.json({ message: "Phim đã xóa thàng công!" });
    }
  });
};

exports.update_one_movie = (req, res) => {
  movie_model
    .findById(req.params.id, (err, item) => {
      if (!item) {
        res.json({ message: "Không tìm thấy phim cần cập nhật!" });
      } else {
        movie_model.findByIdAndUpdate(
          req.params.id,
          req.body.data,
          (err,
          (itemUpdated) => {
            if (err) {
              res.json({ message: "Cập nhật phim thất bại!" });
            } else {
              axios.put(`${global_var.SERVER_PYTHON}`);
              res.json({ message: "Phim đã cập nhật thành công!" });
            }
          })
        );
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.find_list_movie = (req, res) => {
  let queries = req.query;
  console.log(queries);
  movie_model
    .find(queries, (err, list) => {
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
