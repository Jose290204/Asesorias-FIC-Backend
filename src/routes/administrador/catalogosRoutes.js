const express = require("express");
const router = express.Router();

const catalogosControlador = require("../../controllers/catalogosController");

router.get("/", catalogosControlador.traerCatalogos);

/*
router.get("/materias", catalogosControlador.obtenerMaterias);
router.get("/horarios", catalogosControlador.obtenerHorarios);
router.get("/grupos", catalogosControlador.obtenerGrupos);
router.get("/licenciaturas", catalogosControlador.obtenerLicenciaturas);
router.get("/modalidades", catalogosControlador.obtenerModalidades);
router.get("/razones", catalogosControlador.obtenerRazones);
*/

module.exports = router;