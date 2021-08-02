const express = require('express')
const app = express()
const env = require('./env')

const cors = require('cors')

app.use(cors())
app.use(express.json())

app.get('/',(req, res)=>{
    res.send("<h1>Getting started</h1>")
})


const server = app.listen(env.port, ()=>{
    console.log("Run server in the port http://localhost:"+env.port)
})

const io = require("socket.io")(server, {
    cors: {
      origin: '*',
    }
})

io.on('connection', (socket) => {
    console.log(`Connection with id socket client: ${socket.id}`)

    socket.on('join-client', (data) => {
        socket.emit("disconnect-client-reception", {io:"id: "+data, getD:(p)=>{return `🚓${p}`}, po:2 })
        console.log(data)
    })

    socket.on('disconnect', () => {
        console.log(`Disconnect : ${socket.id}`)
    })

    socket.on('force-disconnect', function(){
        socket.disconnect();
    });
})