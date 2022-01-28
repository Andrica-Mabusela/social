const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const { application } = require('express');
const multer = require('multer');
// const fileExtension = require('file-extension')
const pool = require('./config/db')


// EXPRESS APP
const app = express();

// CORS
app.use(cors({origin: true, credentials: true}))

// SERVE JSON
app.use( express.json() )
app.use( cookieParser() )

// Configure Storage
var storage = multer.diskStorage({

    // Setting directory on disk to save uploaded files
    destination: function (req, file, cb) {
        cb(null, '/Users/academy_learner/Desktop/group-i/frontend/src/assets/img')
    },

    // Setting name of file saved
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

var upload = multer({storage: storage, limits: { fieldSize: 10 * 1024 * 1024 }})



app.post('/uploadfile', upload.single('uploadedImage'), async (req, res) => {

const imgPath = '../../../assets/img/' + req.file.filename

const { location, caption, username, user_id } = req.body;
console.log(req.body)

const post = await pool.query("INSERT INTO posts(user_id, username, myLocation, caption, imgPath) VALUES($1, $2, $3, $4, $5) RETURNING *", [user_id, username, location, caption, imgPath])

 if(post.rows[0] != undefined){
    console.log('datahjdschjshd')
    res.json({data: post.rows[0]})
 } else {
     console.log('errror...')
     res.json({error: 'error occurred'})
 }

})


app.get('/posts', async (req, res) => {

    try {
        const allPosts = await pool.query('SELECT * from posts')
        console.log('got all posts')
        res.send(allPosts.rows)  
    }
    catch(error) {
        res.send(error.message)
    }
    
})





app.get('/test', (req, res) => {
    
})

// ROUTES
app.use('/auth', require('./routes/auth.routes'))


// CREATE A PORT
const port = process.env.port || 5000


// LISTEN FOR REQUESTS
app.listen(port, () => console.log(`Server is listening on localhost:${port}`))