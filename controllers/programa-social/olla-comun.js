const { OllaComun } = require("../../config/Sequelize")
const {httpError500, httpBadRequest400, httpCreated201, httpOk200Content, httpOk200NoContent} = require("../../utils/httpMesagge");

const createOllaComun = async (req, res) => {
    try {
        const {nombre} = req.body;
        const ollaComun = await findOllaComunByName(nombre)
        if (ollaComun) {
            return httpBadRequest400(res, 'La Olla Común ya fue registrada anteriormente.')
        }
        const ollaComunBuild = OllaComun.build(req.body)
        await ollaComunBuild.save()
        return httpCreated201(res, parseObject(ollaComunBuild), 'Olla común agregada correctamente.')
    } catch (error) {
        return httpError500(req, error)
    }
}

const buscarOllaComunById = async (req, res) => {
    try {
        const { id } = req.params
        const ollaComun = await findOllaComunById(id, res)
        if (!ollaComun) {
            return httpBadRequest400(res, `No se encontro la olla común con id ${id}`)
        }
        return httpOk200Content(res, parseObject(ollaComun), 'Consulta existosa.')
    } catch(error) {
        return httpError500(req, error)
    }
}

const updateOllaComun = async (req, res) => {
    try {
        const { id, nombre, direccion } = req.body
        const ollaComun = await findOllaComunById(id, res)
        if (!ollaComun) {
            return httpBadRequest400(res, `No se encontro la olla común con id ${id}`)
        }
        ollaComun.nombre = nombre
        ollaComun.direccion = direccion
        ollaComun.save()
        return httpOk200Content(res, parseObject(ollaComun), 'Datos actualizados correctamente.')
    } catch (error) {
        return httpError500(req, error)
    }
}
const deleteOllaComun = async (req, res) => {
    try {
        const { id } = req.params
        const ollaComun = await findOllaComunById(id, res)
        if (!ollaComun) {
            return httpBadRequest400(res, `No se encontro la olla común con id ${id}`)
        }
        await OllaComun.destroy({
            where: {id}
        })
        ollaComun.estado = 'X'
        await ollaComun.save()
        return httpOk200NoContent(res, 'Registro anulado correctamente correctamente.')
    } catch (error) {
        return httpError500(req, error)
    }
}

const listarOllasComunes = async (req, res) => {
    const { order_by, sort_by, page, size } = req.query;
    OllaComun.findAndCountAll({
        where: {},
        offset: page * size,
        limit: size,
        order: [ [sort_by, order_by] ]
    })
        .then(ollasComunes => {
            const data = getPagingData(ollasComunes, page, size);
            httpOk200Content(res, data, 'Consulta realizada correctamente.')
        })
        .catch(error => httpError500(res, error))
}

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: lista } = data;
    const paginaActual = page ? +page : 0;
    const totalPaginas = Math.ceil(totalItems / limit);
    const listado = lista.map(el => parseObject(el))
    return { totalItems, listado, totalPaginas, paginaActual };
}
const parseObject = (ollaComun) => {
    return {
        id: ollaComun.id,
        nombre: ollaComun.nombre,
        direccion: ollaComun.direccion,
        estado: ollaComun.estado
    }
}

const findOllaComunById = async (id, res) => {
    return await
        OllaComun.findByPk(id)
            .then(ollacomun => ollacomun)
            .catch(err => httpError500(res, err))
}
const existOllaComunById = async (id, res) => {
    return await
        OllaComun.findByPk(id)
            .then(ollacomun => !!ollacomun)
            .catch(err => httpError500(res, err))
}
const findOllaComunByName = async (nombre, res) => {
    return await
        OllaComun.findOne({ where: { nombre, estado: 'A' }})
            .then(ollacomun => !!ollacomun)
            .catch(err => httpError500(res, err.message))
}

module.exports = {
    findOllaComunById, createOllaComun, buscarOllaComunById, updateOllaComun, listarOllasComunes, deleteOllaComun
}
