const express = require("express");
const router = express.Router();

const usuariosControlador = require("../../controllers/usuariosController");

const {verificarToken} = require("../../middlewares/auth.middleware");


router.post("/login", usuariosControlador.login);

router.get("/", verificarToken, (req, res) => {
    res.json({
        message: "estoy en tu cesped nebercracket",
        datos_sesion: req.usuario
    });
});

module.exports = router;