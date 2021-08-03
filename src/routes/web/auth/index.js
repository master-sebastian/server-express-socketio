const User = require('../../../databases/models/User')
const { body, validationResult  } = require('express-validator')
const jwt = require('jsonwebtoken')

module.exports = (app, prefix) => {


    const validatorUsername = ()=>{
        return body('username')
        .notEmpty().withMessage("Es requerido el nombre de usuario")
        .isString().withMessage("El nombre de usuario tiene que ser tipo texto")
    }
    
    const validatorPassword = ()=>{
        return body('password')
        .isString().withMessage("La clave de acceso del usuario tiene que ser tipo texto")
    }

    app.post(`/${prefix}/login`,
        validatorUsername(),
        validatorPassword(),
        (req, res)=>{
            const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }
            const { username, password } =  req.body
            const SHA256 = require("crypto-js/sha256")
            
            User.findOne({
                attributes: ['id','username'],
                where: {
                    username: username,
                    password: SHA256(password).toString()
                }
            }).then((task)=>{
                if(task !== null){
                    jwt.sign(
                        {
                            id:task.id,
                            username:task.username
                        },
                        process.env.SECRET_KEY_JWT,
                        {
                            expiresIn: process.env.EXPIRES_IN_JWT
                        },
                        (err, token)=>{
                            if(err){
                                res.status(500).json({
                                    message: "Error generating token"
                                })
                            }else{
                                res.status(200).json({
                                    token
                                })
                            } 
                        }
                    )
                }else{
                    res.status(400).json({
                        message: "Invalid data"
                    })
                }
            })
        }
    )
}