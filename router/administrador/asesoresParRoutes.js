const express = require("express");
const router = express.Router();

const asesoresParControlador = require("../../controladores/administrador/asesoresParControlador");


router.get("/", asesoresParControlador.obtenerAsesoresPar);
router.post("/", asesoresParControlador.crearAsesorPar);

router.post("/editar", asesoresParControlador.editarAsesorPar)

module.exports = router;