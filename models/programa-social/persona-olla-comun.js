const sequelize = require("sequelize")

const persona_olla_comun_model = conexion => {
    return conexion.define(
        'persona_olla_comun',
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: sequelize.INTEGER,
                allowNull: false
            },
            nivel: {
                type: sequelize.CHAR(3),
                allowNull: false,
                defaultValue: 'INT'
            },
            estado: {
                type: sequelize.CHAR(1),
                allowNull: false,
                defaultValue: 'A'
            }
        },
        {
            tableName: 'personaollacomun',
            timestamps: true,
            paranoid: true
        }
    )
}

module.exports = persona_olla_comun_model
