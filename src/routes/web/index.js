module.exports = (app)=>{
    require("./auth")(app, "auth")
    require("./tasks")(app, "tasks")
}