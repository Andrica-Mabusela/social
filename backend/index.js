const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser')

// EXPRESS APP
const app = express();

// CORS
app.use(cors())

// SERVE JSON
app.use( express.json() )
app.use( cookieParser() )


// ROUTES
app.use('/auth', require('./routes/auth.routes'))


// CREATE A PORT
const port = process.env.port || 5000


// LISTEN FOR REQUESTS
app.listen(port, () => console.log(`Server is listening on localhost:${port}`))