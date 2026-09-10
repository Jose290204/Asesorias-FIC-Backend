const express = require("express");
const router = express.Router();

const asesoriasController = require("./asesoriasController");
const { verificarToken } = require("../../middlewares/auth.middleware");

// Ruta POST para crear una solicitud de asesoría protegida con JWT
router.post("/", verificarToken, asesoriasController.crearAsesoria);

module.exports = router;