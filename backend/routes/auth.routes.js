const express = require('express')
const router = express.Router()
const { authController } = require('../controllers/auth.controller')



// STORE USER IN THE DATABASE
router.post('/register', authController.createUser)


// LOG USER INTO THE DATABASE
router.post('/login', authController.logUserIn)

router.get('/check-user', (req, res) => {
    const token = req.cookies.user

    if(token) {
        jwt.verify(token, 'a very big secret', (err, decodedToken) => {
            if(err) {
                console.log(err)
                res.json('false');
            } else {
                console.log(decodedToken)
                res.json('true')
            }
        })
    } else {
        res.json('false')
    }

})



module.exports = router;