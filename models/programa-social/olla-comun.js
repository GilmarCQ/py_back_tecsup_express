const sequelize = require('sequelize')

const olla_comun_model = (conexion) => {
    return conexion.define(
        'ollacomun',
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
            direccion: {
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
            tableName: 'ollacomun',
            timestamps: true,
            paranoid: true
        }
    )
}

module.exports = olla_comun_model
