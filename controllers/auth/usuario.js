const { Usuario, PersonaOllaComun, OllaComun} = require('../../config/Sequelize')
const jwt = require('jsonwebtoken')
const {findPersona, createPerson} = require("./persona");
const {httpBadRequest400, httpCreated201, httpError500} = require("../../utils/httpMesagge");
const {findOllaComunById} = require("../programa-social/olla-comun");

const login = async (req, res) => {
    try {

    } catch (error) {

    }
}

const createUserResponsable = async (req, res) => {
    try {
        const { tipodocumento, numerodocumento, idollacomun } = req.body
        const personFind = await findPersona(tipodocumento, numerodocumento, res)
        if (!personFind) {
            const idPerson = await createPerson(req.body)
        }
        const ollaComunFind = await findOllaComunById(idollacomun)
        if (!ollaComunFind) {
            return httpBadRequest400(res, 'No se encontro la olla común')
        }
        let usuarioFind = await findUsuario(numerodocumento)
        if (!usuarioFind) {
            usuarioFind = await createUsuario({usuario: numerodocumento, tipo: 'ROC'})
        }

        const personaOllaComun =
            PersonaOllaComun.build({nivel: 'ROC', idollacomun, idpersona: personFind.id})
        return httpCreated201(res, usuarioFind, 'Usuario creado correctamente')

    } catch (error) {
        return httpError500(res, error)
    }
}

const findUsuario = async (usuario, res) => {
    return await
        OllaComun.findOne({ where: { usuario }})
            .then(usuario => !!usuario)
            .catch(err => httpError500(res, err.message))
}
const crearUsuario = async (body) => {
    const usuario = await Usuario.build(body)
    usuario.setSaltAndHash(usuario.password)
    usuario.save()
        .then(newUser => !!newUser)
}

module.exports = {
    createUserResponsable
}
