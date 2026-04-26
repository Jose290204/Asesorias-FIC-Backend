const express = require("express");
const router = express.Router();

const solicitarAsesoriasControlador = require("../../controladores/estudiante/solicitarAsesorias");

router.get("/", solicitarAsesoriasControlador.buscarAsesores)
router.post("/filtros", solicitarAsesoriasControlador.filtrosAsesores)




module.exports = router;