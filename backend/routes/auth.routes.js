const express = require('express')
const router = express.Router()
const { authController } = require('../controllers/auth.controller')



// STORE USER IN THE DATABASE
router.post('/register', authController.createUser)


// LOG USER INTO THE DATABASE
router.post('/login', authController.logUserIn)



module.exports = router;