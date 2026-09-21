const solicitudesRepository = require("./solicitudes.repository")
const db = require("../../config/dbConfig")
const asesoriasRepository = require('./../asesorias/asesorias.repository');
const { map } = require("../../app");

function formatearFecha(fecha){
    const [dia, mes, anio] = fecha.split('/');
    const fechaFormateada = new Date(`${anio}-${mes}-${dia}`);

    return fechaFormateada;
}

async function crearSolicitudAsesoria(datos) { 
    try {
        const nuevaSolicitud = await solicitudesRepository.crearSolicitud(datos)
        

        return nuevaSolicitud;
    } catch (error) {
        console.error("error al crear solicitud", error)
    }
    
}

async function obtenerSolicitudes(idAsesor){

    //si id_asesor no viene undefined
    if(idAsesor){
        return await solicitudesRepository.obtenerSolicitudesPorAsesor(idAsesor);
    }
    return await solicitudesRepository.obtenerTodasLasSolicitudes();
}


async function aceptarSolicitud(id, data) {

    
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
    

    //iniciamos la transaccion
    const resultado = await db.$transaction(async (tx) => {

        const datosLimpios = {
            id_estudiante: parseInt(data.id_estudiante),
            id_asesor: parseInt(data.id_asesor),
            id_materia: parseInt(data.id_materia),
            id_modalidad: parseInt(data.id_modalidad),
            fecha_inicio: formatearFecha(data.fecha_inicio), 
            id_razon: parseInt(data.id_razon),
            id_licenciatura: parseInt(data.id_licenciatura),
            sesiones_tomadas: data.sesiones_tomadas,
            observaciones: data.observaciones,
            id_estatus_asesoria: 3,
            id_horario: parseInt(data.id_horario)
            
        }

        //hacemos el cambio de estado de solicitud y la insercion de la asesoria
        const solicitudActualizada = await solicitudesRepository.aceptarSolicitud(id, tx);
        const nuevaAsesoria = await asesoriasRepository.crearAsesoria(datosLimpios, tx)

        //retornamos los resultadps
        return { solicitudActualizada, nuevaAsesoria}
    })

  return resultado
}

async function rechazarSolicitud(id, razon) {
    
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
    const solicitudRechazada = await solicitudesRepository.eliminarSolicitud(id, razon)

    return solicitudRechazada;
}

module.exports = {crearSolicitudAsesoria, obtenerSolicitudes, aceptarSolicitud, rechazarSolicitud, obtenerSolicitudes}