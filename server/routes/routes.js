const express = require('express')
const router = express.Router()
const loginController = require('../controllers/loginController')
const itemController = require('../controllers/itemController')

router.post('/register', loginController.register)
router.post('/login', loginController.login)
router.post('/google-register', loginController.googleRegister)
router.post('/addItem', itemController.addItem)

module.exports = router;