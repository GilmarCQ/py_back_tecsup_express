const express = require('express');
const ollaComun = require('../../controllers/programa-social/olla-comun');
const ollaComunRouter = express.Router();

ollaComunRouter.post    ('/crear',              ollaComun.createOllaComun)
ollaComunRouter.put     ('/actualizar',         ollaComun.updateOllaComun)
ollaComunRouter.get     ('/listar-paginado',    ollaComun.listarOllasComunes)
ollaComunRouter.get     ('/buscar/:id',         ollaComun.buscarOllaComunById)
ollaComunRouter.delete  ('/anular/:id',         ollaComun.deleteOllaComun)

module.exports = { ollaComunRouter }
