import express from "express";
import { getConfig, updateConfig } from "../controllers/configController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// pública (frontend usa)
router.get("/", getConfig);

// protegida (admin usa)
router.post("/", authMiddleware, updateConfig);

export default router;