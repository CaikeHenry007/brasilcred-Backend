const express = require("express");
const { updateConfig, getConfig } = require("../controllers/configController.js");
const authMiddleware = require("../middleware/authmiddleware.js");

const router = express.Router();

// pública (frontend usa)
router.get("/", getConfig);

// protegida (admin usa)
router.post("/", authMiddleware, updateConfig);

module.exports = router;