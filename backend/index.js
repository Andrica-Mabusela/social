const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')

// EXPRESS APP
const app = express();

// CORS
app.use(cors({origin: true, credentials: true}))

// SERVE JSON
app.use( express.json() )
app.use( cookieParser() )

app.get('/', (req, res) => {
    const maxAge = 2 * 24 * 60 * 60

    const token = jwt.sign({msg: 'hello'}, 'big secret', {expiresIn: '1d'})
    res.cookie('usersd', token, { maxAge: maxAge, httpOnly: true})
    res.send({token: token})
})

// ROUTES
app.use('/auth', require('./routes/auth.routes'))


// CREATE A PORT
const port = process.env.port || 5000


// LISTEN FOR REQUESTS
app.listen(port, () => console.log(`Server is listening on localhost:${port}`))