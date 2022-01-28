const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const pool = require('../config/db')
const joi = require('@hapi/joi')



const maxAge = 2 * 24 * 60 * 60 * 1000

const createToken = (id) => {
    console.log('reached createToken')
    return jwt.sign({id}, 'a very big secret', {expiresIn: maxAge})
}



module.exports.authController = {

    createUser: async (req, res) => {
        // user data
        const {firstName, lastName, username, email, password} = req.body


        // 1. CHECK IF EMAIL ADDRESS EXISTS IN THE DATABASE
        const getEmailQuery = await pool.query('SELECT email FROM users WHERE email = $1', [email])
        console.log(getEmailQuery.rows[0])

        if( getEmailQuery.rows[0] != undefined ){
            // RETURN THE ERROR MESSAGE
            res.json({error: "Email address already exists", success: false, user: null})
            return
        } else {


            //validaion email schema     
            const valUserSchema= { 
                email: joi.string().min(5).required().email(),
            }

            const {error}= joi.validate({email},valUserSchema); 
            console.log('joi error messages ', error)

            if(error != null) {
                
                res.json({error: "Your Email Address is invalid", success: false})
            } else {

                    // CREATE A NEW USER
                    console.log('reached here')
                    // HASH THE PASSWORD
                    const salt = bcrypt.genSaltSync(10)
                    const hashedPassword = bcrypt.hashSync(password, salt);
                    const createUserQuery = await pool.query("INSERT INTO users(firstName, lastName, username, email, password) VALUES($1, $2, $3, $4, $5) RETURNING *", [firstName, lastName, username, email, hashedPassword])
                    console.log(createUserQuery.rows[0].user_id)
                    console.log("new user has been created")
                    res.json({error: null, success: true, user: createUserQuery.rows[0]})

            }

        }

    },

    // LOG IN THE USER TO THE WEB APP

    logUserIn: async (req, res) => {
        const { email, password } = req.body

        // CHECK IF EMAIL IS REGISTERED
        const getEmailQuery = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        if(getEmailQuery.rows[0] == undefined) { // EMAIL DOES NOT EXIST IN THE DB
            console.log('email does not exist')
            res.send({error: "Email is not registered", success: false, user: null})
        }else {
            // check for mathcing password
            const userPassword = getEmailQuery.rows[0].password
            const doesPasswordMatch = await bcrypt.compare(password, userPassword)
            console.log('does password match: ', doesPasswordMatch)

            if(doesPasswordMatch) {
                // email and password match, therefore log the user in.
                const user_id = getEmailQuery.rows[0].user_id;
                console.log('user_id:', user_id)
                const token = createToken(getEmailQuery.rows[0])
                console.log(getEmailQuery.rows[0])
                res.cookie('user', token, {httpOnly: true, sameSite: true, maxAge: maxAge})
                res.send({error: null, success: true, user: getEmailQuery.rows[0], token: token})
            } else {
                res.send({error: "incorrect email/password combination", success: false, user: null})
            }
        }


    },

    logUserOut: (req, res) => {

    }

}



// npm i @hapi/joi 
// exports.validateUser=(user)=>{ 
//     //validaion user schema     
//     const valUserSchema= { 
//     username:Joi.string().min(3).required(), 
//     email: Joi.string().min(5).required().email(),
//     password: Joi.string().min(5).required()
// } 
//     const {error}= Joi.validate(user,valUserSchema); 
//     return error ? error.details[0].message : null;
// }
