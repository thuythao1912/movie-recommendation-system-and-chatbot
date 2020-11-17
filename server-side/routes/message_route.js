const express = require("express");
const router = express.Router();
const message_controller = require("../controllers/message_controller");

router.get("/", message_controller.get_list_message);
router.delete("/", message_controller.delete_list_message);
router.delete("/:id", message_controller.delete_one_message);

module.exports = router;
