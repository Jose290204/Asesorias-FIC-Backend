const estudiantesService = require("../../services/estudiantes.service")

async function getEstudiantes(req, res){
    try {
        const data = await estudiantesService.getEstudiantes();
        res.json(data);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

async function crearEstudiante(req, res) {
    try {
        const datosRecibidos = req.body;

        const resultado = await estudiantesService.crearEstudiante(datosRecibidos);

        res.status(201).json(resultado);
    } catch (error) {
        console.error("Error en el controller al crear:". error);
        res.status(500).json({error: error.message});
    }
}

module.exports = { getEstudiantes, crearEstudiante};