const express = require("express");
const router = express.Router();

const estudiantesControlador = require("../../controladores/administrador/estudiantesControlador");


router.get("/", estudiantesControlador.obtenerEstudiantes);
router.post("/", estudiantesControlador.crearEstudiante)
router.get("/buscar", estudiantesControlador.buscarEstudiantes)
router.post("/editar", estudiantesControlador.editarEstudiante)

module.exports = router;