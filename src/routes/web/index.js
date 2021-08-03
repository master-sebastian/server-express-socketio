module.exports = (app)=>{
    app.get('/',(req, res)=>{
        res.json(
            {
                message: "<h1>Getting started</h1>",
                message_name: process.env.NAME_APP,

            }
        )
    })
}