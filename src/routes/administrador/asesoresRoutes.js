const express = require("express");
const router = express.Router();

const asesoresControlador = require("../../controllers/asesoresController");


router.get("/", asesoresControlador.getAsesores);


module.exports = router;