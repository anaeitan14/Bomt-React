const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");
const itemController = require("../controllers/itemController");
const tableController = require("../controllers/tableController");
const logsController = require("../controllers/logController");
const reportController = require("../controllers/reportController");
const middlewares = require("../middlewares/middlewares");

router.post("/register", loginController.register);
router.post("/login", loginController.login);
router.post("/google-register", loginController.googleRegister);
router.post("/logout", middlewares.sessionCheck, loginController.logout);
router.post("/pickTable", middlewares.sessionCheck, tableController.pickTable);
router.post(
  "/addItem",
  middlewares.sessionCheck,
  middlewares.checkAdminManager,
  itemController.addItem
);
router.post(
  "/addChild",
  middlewares.sessionCheck,
  middlewares.checkAdminManager,
  itemController.addChild
);
router.post("/removeItem", middlewares.sessionCheck, itemController.removeItem);
router.post("/searchItem", middlewares.sessionCheck, itemController.searchItem);
router.get("/getTables", middlewares.sessionCheck, tableController.tables);
router.post("/addTable", middlewares.sessionCheck, tableController.createTable);
router.post(
  "/addManager",
  middlewares.sessionCheck,
  middlewares.checkAdminManager,
  tableController.addManager
);
router.post(
  "/addUser",
  middlewares.sessionCheck,
  middlewares.checkAdminManager,
  tableController.addNormalUser
);
router.get(
  "/getLogs",
  middlewares.sessionCheck,
  middlewares.checkAdminManager,
  logsController.logs
);

router.get(
  "/getReportOne",
  middlewares.sessionCheck,
  middlewares.checkAdminManager,
  reportController.exportToCSV
);
module.exports = router;
