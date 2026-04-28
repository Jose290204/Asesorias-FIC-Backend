const express = require("express");
const router = express.Router();

const asesoresDisciplinaresControlador = require("../../controllers/administrador/asesoresDisciplinaresController");

/*
router.post("/", asesoresDisciplinaresControlador.crearAsesorDisci)
router.get("/", asesoresDisciplinaresControlador.buscarAsesorDisci)
router.post("/editar", asesoresDisciplinaresControlador.editarAsesorDisci)
*/
module.exports = router;