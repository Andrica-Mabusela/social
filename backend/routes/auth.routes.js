const express = require('express')
const router = express.Router()
const { authController } = require('../controllers/auth.controller')



// STORE USER IN THE DATABASE
router.post('/create-user', authController.createUser)



module.exports = router;