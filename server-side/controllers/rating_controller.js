var rating_model = require("../models/rating_model");
var movie_model = require("../models/movie_model");
exports.get_list_rating = (req, res) => {
  movie_name = [];
  let queries = req.query;
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

exports.add_one_rating = async (req, res) => {
  let item = new rating_model(req.body);
  let obj = {
    user_id: item.user_id,
    movie_id: item.movie_id,
    rating_score: item.rating_score,
    rating_time: item.rating_time,
  };
  console.log(obj);
  rating_model
    .findOne(
      { user_id: item.user_id, movie_id: item.movie_id },
      (err, result) => {
        if (!result) {
          item
            .save()
            .then((item) => {
              res.status(200).json({
                message: "Cảm ơn bạn đã đánh giá!",
              });
            })
            .catch((err) => {
              res.status(400).send("Đánh giá phim thất bại!");
            });
        } else if (result) {
          rating_model.findByIdAndUpdate(
            result._id,
            obj,
            (err,
            (itemUpdated) => {
              console.log(itemUpdated);
              if (err) {
                res.json({ message: "Đánh giá phim thất bại!" });
              } else {
                res.json({
                  message: "Kết quả đã được cập nhật. Cảm ơn bạn đã đánh giá!",
                });
              }
            })
          );
        } else if (err) {
          console.log(err);
          res.status(400).send("Đánh giá phim thất bại!");
        }
      }
    )
    .catch((err) => console.log(err));
};

exports.delete_one_rating = (req, res) => {
  rating_model.findByIdAndDelete(req.params.id, (err, rating) => {
    if (err) {
      res.json({ message: "Đánh giá đã xóa thất bại!" });
    } else {
      res.json({ message: "Đánh giá đã xóa thàng công!" });
    }
  });
};

exports.delete_list_rating = (req, res) => {
  rating_model
    .deleteMany((err, list) => {
      if (err) {
        console.log(err);
        res.status(500).send(`Đã có lỗi xảy ra. Xóa thất bại`);
      } else {
        res.json({ message: `Tất cả đánh giá đã xóa thành công` });
      }
    })
    .catch((err) => {
      res.status(400).send(`Đã có lỗi xảy ra. Xóa thất bại`);
    });
};
