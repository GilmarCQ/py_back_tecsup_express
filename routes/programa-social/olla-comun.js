const express = require('express');
const ollaComun = require('../../controllers/programa-social/olla-comun');
const ollaComunRouter = express.Router();

ollaComunRouter.post('/crear', ollaComun.createOllaComun)

module.exports = { ollaComunRouter }
