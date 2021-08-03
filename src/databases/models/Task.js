const {Model, DataTypes} = require('sequelize')
const sequelize = require('../db')

class Task extends Model{}

Task.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING
}, {
    sequelize,
    modelName: "tasks"
})

module.exports = Task