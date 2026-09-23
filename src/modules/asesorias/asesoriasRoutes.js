const express = require("express");
const router = express.Router();

const asesoriasController = require("./asesoriasController");
const { verificarToken } = require("../../middlewares/auth.middleware");
const upload = require("../../middlewares/upload.middleware"); // IMPORTAR MULTER

// Ruta POST para crear una solicitud de asesoria protegida con JWT
router.post("/", verificarToken, asesoriasController.crearAsesoria);

//obtener asesorias en curso
router.get("/", verificarToken, asesoriasController.getAsesoriasEnCurso);

//obtener asesorias del asesor
router.get("/asesor", verificarToken, asesoriasController.getAsesoriasAsesor);

//completar una asesoria
router.patch("/:id/completar", verificarToken, asesoriasController.completarAsesoria);

//eliminar una asesoria
router.delete("/:id/eliminar", verificarToken, asesoriasController.eliminarAsesoria);

//editar una asesoria
router.patch("/:id/editar", verificarToken, asesoriasController.editarAsesoria);



// subir material adicional (usa upload.array para recibir multiples archivos)
router.post("/material", verificarToken, upload.array("archivos"), asesoriasController.agregarMaterial);

// eliminar un archivo de drive
router.delete("/material/:id_material", verificarToken, asesoriasController.eliminarMaterial);

module.exports = router;