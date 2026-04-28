const express = require("express");
const router = express.Router();

const usuariosControlador = require("../../controllers/administrador/usuariosController");

/*
router.delete("/", usuariosControlador.eliminarUsuario)
router.post('/', usuariosControlador.iniciarSesion)
*/
module.exports = router;