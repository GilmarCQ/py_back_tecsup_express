const express = require('express');
const usuario = require('../../controllers/auth/usuario');
const usuarioRouter = express.Router();

usuarioRouter.post('/crear-responsable', usuario.createUserResponsable)

module.exports = { usuarioRouter }
