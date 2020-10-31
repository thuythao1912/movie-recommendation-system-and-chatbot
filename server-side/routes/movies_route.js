const express = require("express");
const router = express.Router();
const movies_controller = require("../controllers/movies_controller");

router.post("/", movies_controller.add_one_movie);
module.exports = router;
