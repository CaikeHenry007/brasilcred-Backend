const express = require("express");
const updateConfig = require("../controllers/configController.js");
const getConfig = require("../controllers/configController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

const router = express.Router();

// pública (frontend usa)
router.get("/", getConfig);

// protegida (admin usa)
router.post("/", authMiddleware, updateConfig);

export default router;