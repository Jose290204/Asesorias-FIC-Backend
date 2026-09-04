const express = require("express");
const router = express.Router();

const solicitudesController = require("../../controllers/solicitudesController");
const { verificarToken } = require("../../middlewares/auth.middleware");

// Ruta POST para crear una solicitud de asesoría protegida con JWT
router.post("/", verificarToken, solicitudesController.crearSolicitud);
router.get("/", verificarToken, solicitudesController.traerSolicitudes)

module.exports = router;