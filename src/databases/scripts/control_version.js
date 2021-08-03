const path = require('path')

module.exports = {
    "v1.0": {
        description: "Estructura de la tabla tasks",
        path: path.join(__dirname, 'v1.0.sql'),
        process: (sqlText)=>{ return sqlText}
    },
    "v1.1": {
        description: "Agregando campos createdAt y updatedAt en la tabla de tasks",
        path: path.join(__dirname, 'v1.1.sql'),
        process: (sqlText)=>{ return sqlText}
    },
    "v2.0": {
        description: "Estructura de tabla users",
        path: path.join(__dirname, 'v2.0.sql'),
        process: (sqlText)=>{ return sqlText}
    },
    "v2.1": {
        description: "Agregando usuario por defecto",
        path: path.join(__dirname, 'v2.1.sql'),
        process: (sqlText)=>{
            const SHA256 = require("crypto-js/sha256")
            sqlText = sqlText.replace("<& ?__username__? &>", "user_client")
                                .replace("<& ?__password__? &>", SHA256(process.env.PASSWORD_DEFAULF_USERS || 'password').toString())
            return sqlText
        }
    }
}