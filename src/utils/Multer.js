let multer  = require('multer')
module.exports = (config)=>{
    let storage = multer.diskStorage(config)
    return multer({ storage:  storage})
} 