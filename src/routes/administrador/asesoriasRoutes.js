const express = require("express");
const router = express.Router();

const asesoriasControlador = require("../../controllers/asesoriasController");

/*
router.get("/", asesoriasControlador.obtenerAsesorias);
router.post("/", asesoriasControlador.crearAsesoria)
router.post("/completar", asesoriasControlador.completarAsesoria)
router.delete("/", asesoriasControlador.eliminarAsesoria)
router.get("/asesores", asesoriasControlador.obtenerAsesoresTodos)
router.post("/editar", asesoriasControlador.editarAsesoria)
router.get("/completadas", asesoriasControlador.obtenerAsesoriasCompletadas)
*/

module.exports = router;