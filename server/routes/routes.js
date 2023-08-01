const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");
const itemController = require("../controllers/itemController");
const tableController = require("../controllers/tableController");
const middlewares = require("../middlewares/middlewares");

router.post("/register", loginController.register);
router.post("/login", loginController.login);
router.post("/google-register", loginController.googleRegister);
router.post("/logout", middlewares.sessionCheck, loginController.logout);
router.post("/addItem", middlewares.sessionCheck, itemController.addItem);
router.post("/removeItem", middlewares.sessionCheck, itemController.removeItem);
router.post("/searchItem", middlewares.sessionCheck, itemController.searchItem);
router.post("/addTable", middlewares.sessionCheck, tableController.createTable);
router.post(
  "/addManager",
  middlewares.sessionCheck,
  middlewares.checkPermissions,
  tableController.addManager
);
router.post(
  "/addUser",
  middlewares.sessionCheck,
  middlewares.checkPermissions,
  tableController.addNormalUser
);

module.exports = router;
