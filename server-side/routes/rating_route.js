const express = require("express");
const router = express.Router();
const rating_controller = require("../controllers/rating_controller");

router.get("/", rating_controller.get_list_rating);
router.get("/count", rating_controller.count_rating);
router.post("/", rating_controller.add_one_rating);
router.delete("/:id", rating_controller.delete_one_rating);
router.delete("/", rating_controller.delete_list_rating);

module.exports = router;
