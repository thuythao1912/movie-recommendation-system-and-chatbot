const express = require("express");
const router = express.Router();
const user_controller = require("../controllers/user_controller");

router.get("/", user_controller.get_list_user);
router.post("/", user_controller.add_one_user);
router.delete("/:id", user_controller.delete_one_user);
router.post("/check-login-user", user_controller.check_login_user);
router.delete("/", user_controller.delete_list_user);

module.exports = router;
