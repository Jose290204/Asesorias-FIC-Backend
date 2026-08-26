const solicitudesRepository = require("../repositories/solicitudes.repository")

async function crearSolicitudAsesoria(datos) { //funcion para mandar los datos del usuario al controller para comparar con bycrpt las passwords
    try {
        const nuevaSolicitud = await solicitudesRepository.crearSolicitud(datos)
        

        return nuevaSolicitud;
    } catch (error) {
        console.error("error al crear solicitud", error)
    }
    
}

module.exports = {crearSolicitudAsesoria}