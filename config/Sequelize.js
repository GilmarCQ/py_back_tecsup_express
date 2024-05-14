const Sequelize = require("sequelize");

const conexion = new Sequelize(
    'py_tecsup', 'postgres', 'postgres',
    {
        host: 'localhost',
        dialect: 'postgres',
        port: 5432,
    }
)

module.exports = {
    conexion
};