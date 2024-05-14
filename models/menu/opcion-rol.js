const sequelize = require("sequelize")

const opcion_rol_model = conexion => {
    return conexion.define(
        'opcion_rol',
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: sequelize.INTEGER,
                allowNull: false
            },
            estado: {
                type: sequelize.CHAR(1),
                allowNull: false,
                defaultValue: 'A'
            }
        },
        {
            tableName: 'opcionrol',
            timestamps: true,
            paranoid: true
        }
    )
}

module.exports = opcion_rol_model
