const express = require("express");
const router = express.Router();

const solicitudesControlador = require("../../controllers/solicitudesController");

/*
router.get("/", solicitudesControlador.obtenerSolicitudes)
router.post('/eliminar', solicitudesControlador.eliminarSolicitud)
router.post('/aceptar', solicitudesControlador.aceptarSolicitud)
router.post('/', solicitudesControlador.crearSolicitud)
*/
module.exports = router;