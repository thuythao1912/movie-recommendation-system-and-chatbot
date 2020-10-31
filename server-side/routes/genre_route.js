const express = require("express");
const router = express.Router();
const genre_controller = require("../controllers/genre_controller");

router.post("/", genre_controller.add_list_genre);
router.get("/", genre_controller.get_list_genre);
router.get("/count", genre_controller.count_genre);
module.exports = router;
