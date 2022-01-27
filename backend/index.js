const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const multer = require('multer');
const { application } = require('express');

// EXPRESS APP
const app = express();

// CORS
app.use(cors({origin: true, credentials: true}))

// SERVE JSON
app.use( express.json() )
app.use( cookieParser() )


const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads')
    },
    filename: (req, file, callBack) => {
        callBack(null, `myImage_${file.originalname}`)
    }
})

var upload = multer({storage: storage})




// ROUTES
app.use('/auth', require('./routes/auth.routes'))


// CREATE A PORT
const port = process.env.port || 5000


// LISTEN FOR REQUESTS
app.listen(port, () => console.log(`Server is listening on localhost:${port}`))