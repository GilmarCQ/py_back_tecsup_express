const { Persona } = require("../../config/Sequelize")
const {httpError500} = require("../../utils/httpMesagge");

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
    findPersona, createPerson
}
