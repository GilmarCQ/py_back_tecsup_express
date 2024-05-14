const sequelize = require("sequelize")

const usuario_rol_model = conexion => {
    return conexion.define(
        'usuario_rol',
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
            tableName: 'usuariorol',
            timestamps: true,
            paranoid: true
        }
    )
}

module.exports = usuario_rol_model
