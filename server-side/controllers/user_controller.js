var user_model = require("../models/user_model");
var rating_model = require("../models/rating_model");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync();
const utils = require("../utils/utils");
exports.get_list_user = (req, res) => {
  user_model
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

exports.check_login_user = (req, res) => {
  let user_login = req.body.user_login;
  let user_password = req.body.user_password;
  user_model.findOne(
    { user_login: user_login, is_admin: false },
    (err, user) => {
      if (user) {
        let isCorrectPasssword = bcrypt.compareSync(
          user_password,
          user.user_password
        );

        if (isCorrectPasssword) {
          res.json({
            message: `Đăng nhập thành công! Chúc bạn trải nghiệm hệ thống vui vẻ!`,
            data: user,
          });
        } else {
          res.json({
            message: `Sai tên đăng nhập hoặc mật khẩu, hoặc bạn không có quyền truy cập trang web này!`,
            data: user,
          });
        }
      } else {
        res.json({
          message: `Sai tên đăng nhập hoặc mật khẩu, hoặc bạn không có quyền truy cập trang web này!`,
          data: user,
        });
      }
    }
  );
};

exports.add_one_user = async (req, res) => {
  let user_id = await utils.get_greatest_id("users", "user_id");
  let item = new user_model(req.body);
  item.user_id = user_id;
  user_model
    .findOne({ user_login: item.user_login }, (err, result) => {
      if (!result) {
        item.user_password = bcrypt.hashSync(item.user_password, salt);
        item
          .save()
          .then((item) => {
            res.status(200).json({
              message: "Tài khoản đã được tạo thành công! Vui lòng đăng nhập!",
            });
          })
          .catch((err) => {
            res.status(400).send("Tạo tài khoản thất bại!");
          });
      } else if (result) {
        res.json({
          message: "Tên đăng nhập đã có, vui lòng chọn tên đăng nhập khác!",
        });
      } else if (err) {
        console.log(err);
        res.status(400).send("Tài khoản tạo thất bại!");
      }
    })
    .catch((err) => console.log(err));
};

exports.delete_one_user = (req, res) => {
  user_model.findByIdAndDelete(req.params.id, (err, user) => {
    if (err) {
      res.json({ message: "Tài khoản đã xóa thất bại!" });
    } else {
      rating_model.deleteMany({ user_id: user.user_id }, (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send(`Đã có lỗi xảy ra. Xóa thất bại!`);
        } else {
          res.json({ message: `Tài khoản đã xóa thành công!` });
        }
      });
    }
  });
};

exports.delete_list_user = (req, res) => {
  user_model
    .deleteMany((err, list) => {
      if (err) {
        console.log(err);
        res.status(500).send(`Đã có lỗi xảy ra. Xóa thất bại`);
      } else {
        res.json({ message: `Tất cả tài khoán đã xóa thành công` });
      }
    })
    .catch((err) => {
      res.status(400).send(`Đã có lỗi xảy ra. Xóa thất bại`);
    });
};

exports.count_user = async (req, res) => {
  let count_doc = 0;
  await user_model.countDocuments((err, result) => {
    count_doc = result;
  });
  res.status(200).json(count_doc);
};
