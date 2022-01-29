const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const multer = require('multer');

const { application } = require('express');
// const fileExtension = require('file-extension')
const pool = require('./config/db')


// EXPRESS APP
const app = express();

//Server binding for LAN
const host = '10.10.3.19';

// CORS
app.use(cors({origin: true, credentials: true}))

// SERVE JSON
app.use( express.json() )
app.use( cookieParser() )


// Configure Storage
var storage = multer.diskStorage({

    // Setting directory on disk to save uploaded files
    destination: function (req, file, cb) {
        cb(null, '../frontend/src/assets/img')
    },

    // Setting name of file saved
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

var upload = multer({storage: storage, limits: { fieldSize: 10 * 1024 * 1024 }})



app.post('/uploadfile', upload.single('uploadedImage'), async (req, res) => {


    try{
const imgPath = '../../../assets/img/' + req.file.filename

const { location, caption, username, user_id } = req.body;
console.log(req.body)

const post = await pool.query("INSERT INTO posts(user_id, username, myLocation, caption, imgpath) VALUES($1, $2, $3, $4, $5) RETURNING *", [user_id, username, location, caption, imgPath])

 if(post.rows[0] != undefined){
    res.json({data: post.rows[0]})
 } else {
     console.log('errror...')
     res.json({error: 'error occurred'})
 }

} catch(error) {
    console.log(error)
    res.json({error: error})
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


// GET CURRENT USER POSTS
app.get('/posts/:id', async (req, res) => {

    try {
        const userPosts = await pool.query("SELECT * FROM posts WHERE user_id = $1", [req.params.id])
        console.log(userPosts)
        console.log('posts retrieved')
        res.send({error: null, posts: userPosts.rows})
    } catch(error) {
        console.log(error)
        res.send({error: error.message, posts: null})
    }

})




// ROUTES
// app.use('/posts', require('./routes/posts.routes'))
app.use('/auth', require('./routes/auth.routes'))


// CREATE A PORT
const port = process.env.port || 5000


// LISTEN FOR REQUESTS
app.listen(port, () => console.log(`Server is listening on localhost:${port}`))