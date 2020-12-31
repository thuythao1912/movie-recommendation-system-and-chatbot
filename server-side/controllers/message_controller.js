var message_model = require("../models/message_model");

exports.get_list_message = (req, res) => {
  message_model
    .find({}, null, { sort: { created_time: -1 } }, (err, list) => {
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

exports.delete_list_message = (req, res) => {
  message_model
    .deleteMany((err, list) => {
      if (err) {
        console.log(err);
        res.status(500).send(`Đã có lỗi xảy ra. Xóa thất bại`);
      } else {
        res.json({ message: `Tất cả tin nhắn đã xóa thành công` });
      }
    })
    .catch((err) => {
      res.status(400).send(`Đã có lỗi xảy ra. Xóa thất bại`);
    });
};

exports.delete_one_message = (req, res) => {
  message_model.findByIdAndDelete(req.params.id, (err, movie) => {
    if (err) {
      res.json({ message: "Tin nhắn đã xóa thất bại!" });
    } else {
      res.json({ message: "Tin nhắn đã xóa thàng công!" });
    }
  });
};
