const express = require("express");
const router = express.Router();

const solicitudesController = require("./solicitudesController");
const { verificarToken } = require("../../middlewares/auth.middleware");

// Ruta POST para crear una solicitud de asesoría protegida con JWT
router.post("/", verificarToken, solicitudesController.crearSolicitud);

//traer todas las solicitudes
router.get("/", verificarToken, solicitudesController.traerSolicitudes)

//aceptar solicitudes
router.patch("/:id", verificarToken, solicitudesController.aceptarSolicitud);

//eliminar solicitudes
router.delete("/:id", verificarToken, solicitudesController.rechazarSolicitud);

module.exports = router;