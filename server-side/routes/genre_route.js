const express = require("express");
const router = express.Router();
const genre_controller = require("../controllers/genre_controller");

router.post("/", genre_controller.add_list_genre);
router.get("/", genre_controller.get_list_genre);
router.get("/count", genre_controller.count_genre);
router.get("/greatest_id", genre_controller.get_greatest_genre_id);
router.delete("/:id", genre_controller.delete_one_genre);
router.put("/:id", genre_controller.update_one_genre);
router.delete("/", genre_controller.delete_list_genre);

module.exports = router;
