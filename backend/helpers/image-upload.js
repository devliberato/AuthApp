const multer = require("multer");
const path = require("path");

//destination

const imageStorage = multer.diskStorage(
    {
        destination: function(req, file, cb) {
            let folder = "users"

            cb(null, `public/images/${folder}`)

        },
        filename: function(req, file, cb) {
            cb(null, Date.now() + path.extname(file.originalname))
        }
    }
)

const imageUpload = multer({storage: imageStorage,
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(png|jpg)$/))
            return cb(new Error("Por favor, envie apenas imagens png e jpg"))

        cb(undefined, true)
    }

    
})

module.exports = {imageUpload};