const estudiantesRepository = require("../repositories/estudiantes.repository")

async function getEstudiantes(){
    return await estudiantesRepository.getEstudiantes();
}

module.exports = {getEstudiantes}