const express = require("express");
const router = express.Router();
const leadController = require("../controllers/leadcontroller");
const authMiddleware = require("../middleware/authmiddleware");

router.get("/", authMiddleware, leadController.getLeads);

module.exports = router;
