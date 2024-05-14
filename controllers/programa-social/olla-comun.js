const { OllaComun } = require("../../config/Sequelize")
const {httpError500, httpBadRequest400, httpCreated201} = require("../../utils/httpMesagge");

const createOllaComun = async (req, res) => {
    try {
        const {nombre, direccion} = req.body;
        const ollaComun = await findOllaComunByName(nombre)
        if (ollaComun) {
            return httpBadRequest400(res, 'El nombre de la olla común ya existe.')
        }
        const ollaComunBuild = OllaComun.build(req.body)
        await ollaComunBuild.save()
        return httpCreated201(res, ollaComunBuild, 'Olla común creada correctamente.')
    } catch (error) {
        return httpError500(req, error)
    }

}

const findOllaComunById = async (id, res) => {
    return await
        OllaComun.findByPk({ where: { id, estado: 'A' }})
            .then(ollacomun => !!ollacomun)
            .catch(err => httpError500(res, err.message))
}
const findOllaComunByName = async (nombre, res) => {
    return await
        OllaComun.findOne({ where: { nombre, estado: 'A' }})
            .then(ollacomun => !!ollacomun)
            .catch(err => httpError500(res, err.message))
}

module.exports = {
    findOllaComunById, createOllaComun
}
