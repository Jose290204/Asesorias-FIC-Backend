const estudiantesService = require("../../services/estudiantes.service")

async function getEstudiantes(req, res){
    try {
        const data = await estudiantesService.getEstudiantes();
        res.json(data);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = { getEstudiantes};