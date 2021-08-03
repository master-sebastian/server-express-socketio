const { readFileSync } = require('fs');
const sequelize = require("./../db")
const controlVersion = require("./control_version")
const {FgRed, FgGreen, Reset, Bright, FgBlue  } = require('./../../utils/ColorTerminal')
let listRequestScript = process.argv.slice(2);

for (let element of listRequestScript) {
    if(controlVersion[element] !== undefined){
        try{
            console.log(FgGreen, "Reading file from "+element+" ...", Reset)
            console.log(Bright, "Description "+element+": ", Reset, FgBlue, controlVersion[element].description, Reset)
            let sqlString = readFileSync(controlVersion[element].path, 'utf8');
            console.log(FgGreen, "Running script: "+element+" ...", Reset)
            sequelize.query(controlVersion[element].process(sqlString));
            console.log(FgGreen,"Finished run script: "+element, Reset)
        }catch(error){
            console.log(FgRed,"Error in run script: "+element, Reset)
            console.error(error)
        }
    }else{
        console.log(FgRed,"Not exist script: "+element, Reset)
    }
}
