const express = require("express");
const router = express.Router();

const usuariosControlador = require("../../controladores/administrador/usuariosControlador");


router.delete("/", usuariosControlador.eliminarUsuario)
router.post('/', usuariosControlador.iniciarSesion)

module.exports = router;