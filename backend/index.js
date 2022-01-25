const express = require('express');

// EXPRESS APP
const app = express();


// SERVE JSON
app.use( express.json() )


// ROUTES
app.use('/auth', require('./routes/auth.routes'))


// CREATE A PORT
const port = process.env.port || 5000


// LISTEN FOR REQUESTS
app.listen(port, () => console.log(`Server is listening on localhost:${port}`))