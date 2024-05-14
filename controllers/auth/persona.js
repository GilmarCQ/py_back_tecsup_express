const { Persona, PersonaOllaComun} = require("../../config/Sequelize")
const {httpError500, httpBadRequest400, httpCreated201} = require("../../utils/httpMesagge");
const {findOllaComunById, createOllaComun} = require("../programa-social/olla-comun");

const addIntegranteOllaComun = async (req, res) => {
    try {
        const {tipodocumento, numerodocumento, idollacomun} = req.body;
        let persona = await findPersona(tipodocumento, numerodocumento)
        if (!persona) {
            persona = await createPerson(req.body, res)
        }

        let ollacomun = await findOllaComunById(idollacomun)
        if (!ollacomun) {
            ollacomun = await createOllaComun(req.body, res)
        }

        const personaOllaComunBuild = PersonaOllaComun.build(req.body)
        await personaOllaComunBuild.save()
        return httpCreated201(res, personaOllaComunBuild, 'Integrante agregado correctamente a olla común.')
    } catch (error) {
        return httpError500(req, error)
    }

}

const findPersona = async (tipodocumento, numerodocumento, res) => {
    return await
        Persona.findOne({ where: { tipodocumento, numerodocumento } })
            .then(person => !!person)
            .catch(err => httpError500(res, err.message))
}

const createPerson = (body) => {
    const personBuild = Persona.build(body)
    personBuild.save()
        .then(person => person.id)
        .catch(err => httpError500(res, err.message))
}
module.exports = {
    findPersona, createPerson, addIntegranteOllaComun
}
