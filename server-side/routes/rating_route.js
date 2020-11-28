const express = require("express");
const router = express.Router();
const rating_controller = require("../controllers/rating_controller");

router.get("/", rating_controller.get_list_rating);

module.exports = router;
