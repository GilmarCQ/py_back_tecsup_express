const sequelize = require("sequelize")

const persona_model = (conexion) => {
    return conexion.define(
        'persona',
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: sequelize.INTEGER,
                allowNull: false
            },
            tipodocumento: {
                type: sequelize.CHAR(2),
                allowNull: false
            },
            numerodocumento: {
                type: sequelize.CHAR(11),
                allowNull: false
            },
            nombres: {
                type: sequelize.TEXT,
                allowNull: false
            },
            apellidopaterno: {
                type: sequelize.TEXT,
                allowNull: false
            },
            apellidomaterno: {
                type: sequelize.TEXT,
                allowNull: false
            },
            direccion: { type: sequelize.TEXT },
            correo: { type: sequelize.TEXT },
            telefono: { type: sequelize.CHAR(10) },
            genero: { type: sequelize.CHAR },
            fechanacimiento: { type: sequelize.DATEONLY },
            estado: {
                type: sequelize.CHAR(1),
                allowNull: false,
                defaultValue: 'A'
            }
        },
        {
            tableName: 'persona',
            timestamps: true,
            paranoid: true
        }
    )
}

module.exports = persona_model
