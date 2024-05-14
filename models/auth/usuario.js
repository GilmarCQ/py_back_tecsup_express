const sequelize = require("sequelize")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")

const usuario_model = conexion => {
    let usuario = conexion.define(
        'usuario',
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: sequelize.INTEGER,
                allowNull: false
            },
            usuario: {
                type: sequelize.CHAR(11),
                allowNull: false
            },
            tipo: {
                type: sequelize.CHAR(3),
                allowNull: false
            },
            estado: {
                type: sequelize.CHAR(1),
                allowNull: false,
                defaultValue: 'A'
            },
            hash: {
                type: sequelize.TEXT,
                allowNull: false
            },
            salt: {
                type: sequelize.TEXT,
                allowNull: false
            }
        },
        {
            tableName: 'usuario',
            timestamps: true,
            paranoid: true
        }
    )
    usuario.prototype.setSaltAndHash = function (password) {
        this.salt = crypto.randomBytes(16).toString('hex')
        this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
            .toString('hex')
    }

    usuario.prototype.validatePassword = function (password) {
        let hash_temporal = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
            .toString('hex')
        return hash_temporal === this.hash
    }

    usuario.prototype.generateJWT = function () {
        let payload = {
            usu_id: this.id,
            usu_name: this.usuario,
            usu_tipo: this.tipo
        }
        let token = jwt.sign(
            payload,
            process.env.KEY_TOKEN,
            { expiresIn: '2h'}, {algorithm: 'RS256'})
        return token
    }
    return usuario
}

module.exports = usuario_model
