const express = require("express");
const router = express.Router();

const estudiantesControlador = require("../../controllers/administrador/estudiantesController");


router.get("/", estudiantesControlador.getEstudiantes);


module.exports = router;