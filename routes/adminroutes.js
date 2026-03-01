const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admincontroller");

router.post("/login", adminController.loginAdmin);
// router.post("/create", adminController.criarAdmin);

module.exports = router;
