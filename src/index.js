const express = require('express')
const path = require('path')
const app = express()
const sequelize = require('./databases/db')

require('dotenv').config({
    path: path.join(__dirname, '.env')
})

const cors = require('cors')

app.use(cors({
    origin: '*'
}))

app.use(express.json())

require('./routes/web')(app)

const server = app.listen(process.env.PORT || 3000, ()=>{
    console.log("Run server in the port http://localhost:"+process.env.PORT || 3000)
    sequelize.authenticate()
    .then(()=>{
        console.log("Se conecto a la base de datos")
    })
    .catch(()=>{
        console.log("Se ha producido un error", error)
    })
})

/**
 * 
 * require('./routes/socket')(server)
 */