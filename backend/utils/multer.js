const multer = require('multer');
const path = require('path');

// Configuire Storage
const storage = multer.diskStorage({
    // setting directory on disk to save uploaded files
    destination: function(req, res, cb) {
        cb(null, path.join(__dirname, '../images'))
    },

    // Setting name of file saved
    filename: function (req, res, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({
    storage: storage
})

module.exports = upload;