const express = require('express')
const path = require('path')
const app = express()

require('dotenv').config({
    path: path.join(__dirname, '.env')
})

const cors = require('cors')

app.use(cors())
app.use(express.json())


require('./routes/web')(app)


const server = app.listen(process.env.PORT || 3000, ()=>{
    console.log("Run server in the port http://localhost:"+process.env.PORT || 3000)
})

/**
 * 
 * require('./routes/socket')(server)
 */