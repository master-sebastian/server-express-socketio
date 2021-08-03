
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) =>{
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const fragmentBearerHeader =  bearerHeader.split(" ")
        if(fragmentBearerHeader.length == 2){
            const bearerToken = fragmentBearerHeader[1]
            req.token = bearerToken;
            // invalid token
            jwt.verify(req.token, process.env.SECRET_KEY_JWT, function(err, decoded) {
                if(err){
                    return res.sendStatus(403)
                }
                console.log(decoded)
                next()
            });
        }else{
            res.sendStatus(404)
        }
    }else{
        res.sendStatus(403)
    }
}