const express = require("express");
const router = express.Router();
const statistic_controller = require("../controllers/statistic_controller");

router.get("/count", statistic_controller.count_docs);

module.exports = router;
