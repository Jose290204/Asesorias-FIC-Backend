

const db = require("../../config/dbConfig")



async function crearSolicitud(data, connection = db) {

        const [dia, mes, anio] = data.fecha_inicio.split('/');
        const fechaFormateada = new Date(`${anio}-${mes}-${dia}`);


            const nuevaSolicitud = await connection.solicitudes_asesorias.create({
                data: {
                    id_materia: parseInt(data.id_materia),
                    id_horario: parseInt(data.id_horario),
                    id_modalidad: parseInt(data.id_modalidad),
                    id_estudiante: parseInt(data.id_estudiante),
                    id_asesor: parseInt(data.id_asesor),
                    fecha_inicio: fechaFormateada,
                    id_razon: parseInt(data.id_razon),
                    nota_estudiante: data.nota_estudiante || null,
                    id_estatus: 3,
                }
            });
            return nuevaSolicitud;
    
}

async function aceptarSolicitud(id){

    const solicitudAceptada = await db.solicitudes_asesorias.update({ // se hace el update para marcar completada la solicitud
        where: { id_solicitud: id},
        data: {
            id_estatus: 1 // se cambia a 1 para marcar como completada
        }

    })

    return solicitudAceptada;
}

async function obtenerPorId(id) {
    
    const solicitudExistente = await db.solicitudes_asesorias.findUnique({
        where: {id_solicitud: id }
    })

    return solicitudExistente;
}

async function eliminarSolicitud(id){

    const solicitudEliminada = await db.solicitudes_asesorias.update({ // se hace el update para marcar rechaza la solicitud
        where: { id_solicitud: id},
        data: {
            id_estatus: 2 // se cambia a 1 para marcar como rechazada
        }

    })

    return solicitudEliminada;
}



module.exports = {crearSolicitud, aceptarSolicitud, obtenerPorId, eliminarSolicitud}