const express = require("express");
const router = express.Router();
const user_controller = require("../controllers/user_controller");

router.get("/", user_controller.get_list_user);
router.post("/check-login-user", user_controller.check_login_user);
module.exports = router;
