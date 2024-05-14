const sequelize = require("sequelize")

const opcion_model = conexion => {
    return conexion.define(
        'opcion',
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: sequelize.INTEGER,
                allowNull: false
            },
            nombre: {
                type: sequelize.TEXT,
                allowNull: false
            },
            descripcion: {
                type: sequelize.TEXT,
                allowNull: false
            },
            estado: {
                type: sequelize.CHAR(1),
                allowNull: false,
                defaultValue: 'A'
            }
        },
        {
            tableName: 'opcion',
            timestamps: true,
            paranoid: true
        }
    )
}

module.exports = opcion_model
