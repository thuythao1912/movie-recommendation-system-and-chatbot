var user_model = require("../models/user_model");

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
    { user_login: user_login, user_password: user_password, is_admin: false },
    (err, user) => {
      if (user) {
        res.json({ message: `Đăng nhập thành công`, data: user });
      } else {
        res.json({
          message: `Sai tên đăng nhập hoặc mật khẩu, hoặc bạn không có quyền truy cập trang web này!`,
          data: user,
        });
      }
    }
  );
};
