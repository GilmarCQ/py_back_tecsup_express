const sequelize = require("sequelize")

const rol_model = conexion => {
    return conexion.define(
        'rol',
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
            tableName: 'rol',
            timestamps: true,
            paranoid: true
        }
    )
}

module.exports = rol_model
