const express = require("express");
const router = express.Router();

const asesoriasController = require("./asesoriasController");
const { verificarToken } = require("../../middlewares/auth.middleware");

// Ruta POST para crear una solicitud de asesoría protegida con JWT
router.post("/", verificarToken, asesoriasController.crearAsesoria);

//obtener asesorias en curso
router.get("/", verificarToken, asesoriasController.getAsesoriasEnCurso);

//completar una asesoria
router.patch("/:id/completar", verificarToken, asesoriasController.completarAsesoria);

//eliminar una asesoria
router.delete("/:id/eliminar", verificarToken, asesoriasController.eliminarAsesoria);

//editar una asesoria
router.patch("/:id/editar", verificarToken, asesoriasController.editarAsesoria);


module.exports = router;