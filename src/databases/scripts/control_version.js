const path = require('path')

module.exports = {
    "v1.0": {
        description: "Estructura de la tabla tasks",
        path: path.join(__dirname, 'v1.0.sql')
    },
    "v1.1": {
        description: "Agregando campos en createdAt y updatedAt",
        path: path.join(__dirname, 'v1.1.sql')
    }
}