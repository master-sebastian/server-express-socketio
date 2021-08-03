module.exports = (server) => {
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
}