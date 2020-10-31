const express = require("express");
const router = express.Router();
const movie_controller = require("../controllers/movie_controller");

router.post("/", movie_controller.add_list_movie);
router.get("/", movie_controller.get_list_movie);
router.get("/count", movie_controller.count_movie);
module.exports = router;
