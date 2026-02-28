const express = require("express");
const router = express.Router();
const leadController = require("../controllers/leadcontroller");

router.post("/", leadController.criarLead);

module.exports = router;
