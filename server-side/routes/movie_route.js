const express = require("express");
const router = express.Router();
const movie_controller = require("../controllers/movie_controller");

router.post("/", movie_controller.add_list_movie);
router.get("/", movie_controller.get_list_movie);
router.get("/count", movie_controller.count_movie);
router.get("/greatest_id", movie_controller.get_greatest_movie_id);
router.delete("/:id", movie_controller.delete_one_movie);
router.put("/:id", movie_controller.update_one_movie);
module.exports = router;
