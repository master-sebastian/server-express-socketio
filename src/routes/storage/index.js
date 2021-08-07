const Multer = require('./../../utils/Multer')
const path = require('path')
const pathSrc = require('./../../pathSrc')
const fs = require('fs')
module.exports = {
    folder: {
        private: {
            storage1:{
                path: path.join(pathSrc, 'private_uploads'+path.sep),
                obj: Multer({
                    destination: function (req, file, cb) {
                        let pathSrcLocal = path.join(pathSrc, 'private_uploads'+path.sep)
                        fs.mkdirSync(pathSrcLocal, { recursive: true })
                        cb(null, pathSrcLocal)
                    },
                    filename: function (req, file, cb) {
                        cb(null, Date.now() + path.extname(file.originalname))
                    }
                }) 
            } 
            
        }
    }
}