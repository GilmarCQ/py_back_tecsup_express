const Sequelize = require("sequelize");

const personaModel = require("../models/auth/persona")
const ollaComunModel = require("../models/programa-social/olla-comun")
const usuarioModel = require("../models/auth/usuario")
const rolModel = require("../models/menu/rol")
const opcionModel = require("../models/menu/opcion")
const opcionRolModel = require("../models/menu/opcion-rol")
const usuarioRolModel = require("../models/menu/usuario-rol")
const personaOllaComunModel = require("../models/programa-social/persona-olla-comun")

const conexion = new Sequelize(
    'py_tecsup', 'postgres', 'postgres',
    {
        host: 'localhost',
        dialect: 'postgres',
        port: 5432,
    }
)

const Persona = personaModel(conexion)
const OllaComun = ollaComunModel(conexion)
const Usuario = usuarioModel(conexion)
const Rol = rolModel(conexion)
const Opcion = opcionModel(conexion)
const OpcionRol = opcionRolModel(conexion)
const UsuarioRol = usuarioRolModel(conexion)
const PersonaOllaComun = personaOllaComunModel(conexion)

Usuario.belongsTo(Persona)
// Relacion Opciones - Rol
Opcion.belongsToMany(
    Rol,
    { through: OpcionRol, foreignKey: 'idopcion' })
Rol.belongsToMany(
    Opcion,
    { through: OpcionRol, foreignKey: 'idrol' })
// Relacion Usuario - Rol
Usuario.belongsToMany(
    Rol,
    { through: UsuarioRol, foreignKey: 'idusuario' })
Rol.belongsToMany(
    Usuario,
    { through: UsuarioRol, foreignKey: 'idrol' })
// Relacion Persona - Olla Comun
Persona.belongsToMany(
    OllaComun,
    { through: PersonaOllaComun, foreignKey: 'idpersona' })
OllaComun.belongsToMany(
    Persona,
    { through: PersonaOllaComun, foreignKey: 'idollacomun' })


module.exports = {
    conexion, Persona, OllaComun, Usuario, Rol, Opcion, OpcionRol, UsuarioRol, PersonaOllaComun
};
