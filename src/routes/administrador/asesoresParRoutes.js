const express = require("express");
const router = express.Router();

const asesoresParControlador = require("../../controllers/administrador/asesoresParController");

/*
router.get("/", asesoresParControlador.obtenerAsesoresPar);
router.post("/", asesoresParControlador.crearAsesorPar);

router.post("/editar", asesoresParControlador.editarAsesorPar)
*/
module.exports = router;