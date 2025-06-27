const express = require("express");
require("dotenv").config();
const  cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosRoutePath = '/api/usuarios'

    //Conectar a DB
    this.conectarDB()

    // Middleware
    this.middlewares();
    //Rutas de la aplicacion
    this.routes();
  }

  async conectarDB() {
    await dbConnection()
  }

  middlewares() {
    // CORS
    this.app.use(cors())
    //Parseo y lectura del body
    this.app.use(express.json())
    // Directorio público
    this.app.use(express.static("public"));
  }

  routes() {
    //LLamar las rutas
    this.app.use(this.usuariosRoutePath, require('../routes/usuarios'))
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  }
}

module.exports = Server;
