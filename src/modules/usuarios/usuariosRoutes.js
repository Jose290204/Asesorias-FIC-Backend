const express = require("express");
const router = express.Router();

const usuariosControlador = require("./usuariosController");

const {verificarToken} = require("../../middlewares/auth.middleware");

router.post("/login", usuariosControlador.login);

router.get("/perfil", verificarToken, usuariosControlador.getPerfil);

router.post("/logout", usuariosControlador.logout);

module.exports = router;