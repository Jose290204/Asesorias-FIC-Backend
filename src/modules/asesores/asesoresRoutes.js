const express = require("express");
const router = express.Router();

const asesoresControlador = require("./asesoresController");
const { verificarToken } = require("../../middlewares/auth.middleware");


router.get("/", asesoresControlador.getAsesores);

router.get("/perfil-asesor", verificarToken, asesoresControlador.getPerfilAsesor);


router.put("/materias-horarios", verificarToken, asesoresControlador.actualizarMateriasYHorarios);


module.exports = router;