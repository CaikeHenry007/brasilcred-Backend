const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admincontroller");
const leadController = require("../controllers/leadcontroller");
const auth = require("../middleware/authmiddleware");

router.post("/login", adminController.login);
router.get("/leads", auth, leadController.listarLeads);

module.exports = router;
