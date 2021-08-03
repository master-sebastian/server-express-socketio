const {Model, DataTypes} = require('sequelize')
const sequelize = require('../db')

class User extends Model{}

User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING
}, {
    sequelize,
    modelName: "users"
})

module.exports = User