const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const { conexion } = require("../config/Sequelize");

class Server {
    constructor() {
        dotenv.config()
        this.app = express()
        this.app.use(cors())
        this.puerto = process.env.PORT || 5001
        this.configureParser()
        this.loadRutas()
    }
    configureParser() {
        this.app.use(bodyParser.json({limit: '50mb'}))
        this.app.use(express.urlencoded())
    }
    loadRutas() {
        console.log('LOAD RUTAS')
        this.app.get('/',
            (req, res) =>
            res.status(200).send({'mensaje':'Api funcionando base'}))
    }
    start() {
        this.app.listen(
            this.puerto,
            () => console.log(`API REST Inicializado correctamente ${this.puerto}.`))
        conexion.sync({
            alter: false,
            force: false
        })
            .then(() => console.log('Base de datos sincronizada', this.puerto))
    }
}

module.exports = Server;