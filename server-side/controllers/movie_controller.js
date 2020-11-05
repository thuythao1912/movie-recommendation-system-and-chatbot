const { count } = require("../models/movie_model");
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
  list_movie = req.body.data;
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
    res.status(200).json({ message: message });
  };
  let tasksToGo = list_movie.length;
  if (tasksToGo === 0) {
    onComplete();
  } else {
    await list_movie.map((movie, key) => {
      movie_model.find({ movie_title: movie.movie_title }, (err, result) => {
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
                item.save();
                movie_success++;
                if (--tasksToGo === 0) {
                  // No tasks left, good to go
                  onComplete();
                }
              }
            }
          );
        } else {
          movie_fail++;
          console.log(movie_fail);
          if (--tasksToGo === 0) {
            // No tasks left, good to go
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
  let genre_id = 0;
  movies = await movie_model.find({}, null, { sort: { genre_id: 1 } });
  genre_id = movies[movies.length - 1].movie_id;
  res.status(200).json(genre_id);
};

exports.delete_one_movie = (req, res) => {
  movie_model.findByIdAndDelete(req.params.id, (err, movie) => {
    if (err) {
      res.json({ message: "Phim đã xóa thất bại!" });
    } else {
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
        let data = req.body.data;
        keys = Object.keys(data);
        keys.map((key) => {
          item[key] = data[key];
        });
        console.log(item);
        item.updatedAt = new Date();
        item.__v += 1;
        item.save().then((itemUpdated) => {
          res.status(200).json({
            message: "Phim đã cập nhật thành công!",
            object: itemUpdated,
          });
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
