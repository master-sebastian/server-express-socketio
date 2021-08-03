const { readFileSync } = require('fs');
const sequelize = require("./../db")
const controlVersion = require("./control_version")
const {FgRed, FgGreen, Reset } = require('./../../utils/ColorTerminal')
let listRequestScript = process.argv.slice(2);

for (let element of listRequestScript) {
    if(controlVersion[element] !== undefined){
        try{
            console.log(FgGreen, "Reading file from "+element+" ...", Reset)
            let sqlString = readFileSync(controlVersion[element], 'utf8');
            console.log(FgGreen, "Running script: "+element+" ...", Reset)
            sequelize.query(sqlString);
            console.log(FgGreen,"Finished run script: "+element, Reset)
        }catch(error){
            console.log(FgRed,"Error in run script: "+element, Reset)
            console.error(error)
        }
    }
}
