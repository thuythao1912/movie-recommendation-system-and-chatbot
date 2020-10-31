const express = require("express");
const router = express.Router();
const crud_data = require("../utils/crud_data");

router.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});

module.exports = router;
