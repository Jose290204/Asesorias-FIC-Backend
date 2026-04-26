const express = require("express");
const router = express.Router();

const solicitudesControlador = require("../../controladores/administrador/solicitudesControlador");


router.get("/", solicitudesControlador.obtenerSolicitudes)
router.post('/eliminar', solicitudesControlador.eliminarSolicitud)
router.post('/aceptar', solicitudesControlador.aceptarSolicitud)
router.post('/', solicitudesControlador.crearSolicitud)

module.exports = router;