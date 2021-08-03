const {Sequelize} = require('sequelize')
const path = require('path')
require('dotenv').config({
    path: path.join(require("./../pathSrc"), '.env')
})

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_CONNECTION,
        port: process.env.DB_PORT,
        dialectOptions: {
            ssl: ((process.env.DB_SSL === "true")?true:false)
        }
    }
)

module.exports = sequelize