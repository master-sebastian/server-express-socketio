module.exports = (app)=>{
    app.get('/',(req, res)=>{
        res.send("<h1>Getting started</h1>")
    })
}