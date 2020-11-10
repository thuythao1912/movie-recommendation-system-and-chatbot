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

exports.add_list_genre = async (req, res) => {
  list_genre = req.body.data;

  let genre_success = 0;
  let genre_fail = 0;
  let message = "";
  let onComplete = () => {
    if (genre_success > 0) {
      message += `${genre_success}/${list_genre.length} thể loại đã được thêm thành công!\n`;
    }
    if (genre_fail > 0) {
      message += `${genre_fail}/${list_genre.length} thể loại thêm thất bại!`;
    }
    res.status(200).json({ message: message });
  };
  let tasksToGo = list_genre.length;
  if (tasksToGo === 0) {
    onComplete();
  } else {
    await list_genre.map((genre, key) => {
      genre_model.find({ genre_name: genre.genre_name }, (err, result) => {
        if (result.length == 0) {
          genre_model.find(
            {
              genre_name: {
                $regex: new RegExp(`^${genre.genre_name}$`, "i"),
              },
            },
            (err, result) => {
              if (result.length == 0) {
                let item = new genre_model(genre);
                item.save();
                genre_success++;
                if (--tasksToGo === 0) {
                  onComplete();
                }
              } else {
                genre_fail++;
                if (--tasksToGo === 0) {
                  onComplete();
                }
              }
            }
          );
        } else {
          genre_fail++;
          // console.log(genre_fail);
          if (--tasksToGo === 0) {
            // No tasks left, good to go
            onComplete();
          }
        }
      });
    });
  }
};

exports.count_genre = async (req, res) => {
  let count_doc = 0;
  await genre_model.countDocuments((err, result) => {
    count_doc = result;
  });
  res.status(200).json(count_doc);
};

exports.get_greatest_genre_id = async (req, res) => {
  let genre_id = 0;
  genres = await genre_model.find({}, null, { sort: { genre_id: 1 } });
  id = [];
  genres.forEach((genre) => {
    id.push(parseInt(genre.genre_id));
  });
  genre_id = Math.max.apply(Math, id);
  res.status(200).json(genre_id);
};

exports.delete_one_genre = (req, res) => {
  genre_model.findByIdAndDelete(req.params.id, (err, genre) => {
    if (err) {
      res.json({ message: "Thể loại đã xóa thất bại!" });
    } else {
      res.json({ message: "Thể loại đã xóa thàng công!" });
    }
  });
};

exports.update_one_genre = (req, res) => {
  genre_model
    .findById(req.params.id, (err, item) => {
      if (!item) {
        res.json({ message: "Không tìm thấy thể loại cần cập nhật!" });
      } else {
        genre_model.findByIdAndUpdate(
          req.params.id,
          req.body.data,
          (err,
          (itemUpdated) => {
            if (err) {
              res.json({ message: "Cập nhật thể loại thất bại!" });
            } else {
              res.json({ message: "Thể loại đã cập nhật thành công!" });
            }
          })
        );
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
