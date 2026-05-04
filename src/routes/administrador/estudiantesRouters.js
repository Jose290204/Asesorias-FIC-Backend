const express = require("express");
const router = express.Router();

const estudiantesControlador = require("../../controllers/administrador/estudiantesController");


router.get("/", estudiantesControlador.getEstudiantes);
router.post("/", estudiantesControlador.crearEstudiante);


module.exports = router;