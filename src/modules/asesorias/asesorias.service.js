const db = require("../../config/dbConfig")
const AsesoriasRepository = require('./asesorias.repository')

async function crearAsesoria(data) { //funcion para mandar los datos del usuario al controller para comparar con bycrpt las passwords
    try {
        const nuevaAsesoria = await AsesoriasRepository.crearAsesoria(data);

        

        return nuevaAsesoria;
    } catch (error) {
        console.error("error al crear asesoria", error)
    }
    
}

module.exports = {crearAsesoria}