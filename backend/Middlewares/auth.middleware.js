const req = require('express/lib/request')
const Joi = require('joi')
const sequelizeConnection = require('../config/db.config')

// GET THE USER MODEL
const User = require('../models/User.model')



// REGISTER FORM AUTH VALIDATION
module.exports.registerValidation = async (req, res, next) => {

    const { firstName, lastName, userName, email, password } = req.body;

    const schema = Joi.object({
        firstName: Joi.string(),
        lastName: Joi.string(),
        userName: Joi.string(),
        email: Joi.string().email(),
        password: Joi.string().required().min(8)
    })

    const { error, value } = schema.validate({ firstName, lastName, userName, email, password })
    
    req.authErrMessage = error == undefined ? undefined : error.details[0].message
    req.authenticatedUser = value

    next()
}


// LOGIN VALIDATION MIDDLEWARE
module.exports.loginValidation = (req, res, next) => {

    const { email, password } = req.body 

    const schema = Joi.object({
        email: Joi.string().email(),
        password: Joi.string().required().min(8)
    })

    const { error, value } = schema.validate({ email, password })
    
    req.authErrMessage = error == undefined ? undefined : error.details[0].message
    req.authenticatedUser = value
    console.log(req.authErrMessage)
    next()

}

module.exports.test = (req, res, next) => {
    console.log('message from test middleware')
    next()
}

