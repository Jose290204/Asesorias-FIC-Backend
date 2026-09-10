const solicitudesRepository = require("./solicitudes.repository")
const db = require("../../config/dbConfig")

async function crearSolicitudAsesoria(datos) { 
    try {
        const nuevaSolicitud = await solicitudesRepository.crearSolicitud(datos)
        

        return nuevaSolicitud;
    } catch (error) {
        console.error("error al crear solicitud", error)
    }
    
}

async function traerSolicitudes(){
    try {
        const solicitudes = await db.solicitudes_asesorias.findMany();

        return solicitudes;
    } catch (error) {
        console.error("Error buscando solicitudes", error);
        throw error;
    }
}

module.exports = {crearSolicitudAsesoria, traerSolicitudes}