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

async function aceptarSolicitud(id) {
    
    //buscamos la solicitud por id 
    const solicitudExistente = await solicitudesRepository.obtenerPorId(id);

    //validamos si la solicitud existe
    if(!solicitudExistente){
        const error = new Error("La solicitud no existe")
        error.status = 404
        throw error;
    }

    //validamos si la solicitud ya fue aceptada
    if(solicitudExistente.id_estatus === 1){
        const error = new Error("La solicitud ya fue aceptada")
        error.status = 400
        throw error;
    }

    //validamos si la solicitud no esta rechazada
    if(solicitudExistente.id_estatus === 2){
        const error = new Error("Una solicitud rechaza no puede ser aceptada")
        error.status = 400
        throw error;
    }

    //si todo pasa ejecutamos el service
    const solicitudAceptada = await solicitudesRepository.aceptarSolicitud(id)

    return solicitudAceptada
}

async function rechazarSolicitud(id) {
    
    //buscamos la solicitud por id 
    const solicitudExistente = await solicitudesRepository.obtenerPorId(id);

    //validamos si la solicitud existe
    if(!solicitudExistente){
        const error = new Error("La solicitud no existe")
        error.status = 404
        throw error;
    }

    //todo lo que se quiera hacer cambio, si ya fue rechazada sale alli
    if(solicitudExistente.id_estatus === 2){
        const error = new Error("La solicitud ya fue rechazada")
        error.status = 400
        throw error;
    }

    //si todo pasa ejecutamos el service
    const solicitudRechazada = await solicitudesRepository.eliminarSolicitud(id)

    return solicitudRechazada;
}

module.exports = {crearSolicitudAsesoria, traerSolicitudes, aceptarSolicitud, rechazarSolicitud}