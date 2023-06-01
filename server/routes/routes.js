const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");
const itemController = require("../controllers/itemController");
const tableController = require("../controllers/tableController");

router.post("/register", loginController.register);
router.post("/login", loginController.login);
router.post("/google-register", loginController.googleRegister);
router.post("/logout", loginController.logout);
router.post("/addItem", itemController.addItem);
router.post("/removeItem", itemController.removeItem);
router.post("/searchItem", itemController.searchItem);
router.post("/addTable", tableController.createTable);

module.exports = router;
