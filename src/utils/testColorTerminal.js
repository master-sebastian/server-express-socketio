const colorTerminal = require("./ColorTerminal")
for(let item of Object.keys(colorTerminal)){
    console.log(colorTerminal[item], item, colorTerminal.Reset)
}