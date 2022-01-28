const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads')
    },
    filename: (req, file, callBack) => {
        callBack(null, `myImage_${file.originalname}`)
    }
})

var upload = multer({storage: storage})

module.exports = upload;