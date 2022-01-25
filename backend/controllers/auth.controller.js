const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const pool = require('../config/db')



module.exports.authController = {

    createUser: async (req, res) => {
        // user data
        const {username, email, password, confirm_password} = req.body 


        // CHECK IF EMAIL IS ALREADY REGISTERED
        const checkEmailQuery = await pool.query("SELECT email FROM users WHERE email = $1", [email])

        const returnedEmail = checkEmailQuery.rows[0].email
        
        if( email == returnedEmail ){
            res.json('email already exists')
            return;
        } else {
            // CREATE NEW USER

            // 1. HASH THE PASSWORD
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)

            const insertUserQuery = await pool.query("INSERT INTO users(username, email, password) VALUES($1, $2, $3)", [username, email, hashedPassword])
            console.log(insertUserQuery)
            res.json('user created')
        }
        



    },

    logUserIn: (req, res) => {

    },

    logUserOut: (req, res) => {

    }

}