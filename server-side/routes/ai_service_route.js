const express = require("express");
const router = express.Router();
const ai_service_controller = require("../controllers/ai_service_controller");

router.post("/suggest", ai_service_controller.get_movies_suggest);
router.put("/:func", ai_service_controller.handle_function);
module.exports = router;
