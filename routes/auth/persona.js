const express = require('express');
const persona = require('../../controllers/auth/persona');
const personaRouter = express.Router();

personaRouter.post('/agregar-integrante', persona.addIntegranteOllaComun)

module.exports = { personaRouter }
