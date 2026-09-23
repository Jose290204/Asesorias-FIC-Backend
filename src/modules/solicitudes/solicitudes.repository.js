

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

async function aceptarSolicitud(id, client = db){

    const solicitudAceptada = await client.solicitudes_asesorias.update({ // se hace el update para marcar completada la solicitud
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

async function eliminarSolicitud(id, razon){

    const solicitudEliminada = await db.solicitudes_asesorias.update({ // se hace el update para marcar rechaza la solicitud
        where: { id_solicitud: id},
        data: {
            id_estatus: 2, // se cambia a 1 para marcar como rechazada
            explicacion_asesor: razon
        }
    })


    return solicitudEliminada;
}

async function obtenerTodasLasSolicitudes(){


    //traemos las solicitudes
    const solicitudes = await db.solicitudes_asesorias.findMany({
        include: {
          estudiante: {
            select: {
                id_persona: true,
                nombre: true,
                apellido_paterno: true,
                apellido_materno: true,
                correo: true
            }
          },
            asesor: {
                select: {
                    id_persona: true,
                    nombre: true,
                    apellido_paterno: true,
                    apellido_materno: true
                }
            },
            materias: true,
            horarios: true,
            modalidades: true,
            razon_asesoria: true,
            estatus_solicitud: true,
        }
    })

    

    //hacemos un map para juntar el nombre completo de los usuarios y cmabiar la propiedad del id
    return solicitudes.map((solicitud) => ({
        id_solicitud: solicitud.id_solicitud,
        id_asesor: solicitud.id_asesor,
        nombre_asesor: `${solicitud.asesor.nombre} ${solicitud.asesor.apellido_paterno} ${solicitud.asesor.apellido_materno}`,
        id_estudiante: solicitud.id_estudiante,
        nombre_estudiante: `${solicitud.estudiante.nombre} ${solicitud.estudiante.apellido_paterno} ${solicitud.estudiante.apellido_materno}`,
        correo: solicitud.estudiante.correo,
        id_materia: solicitud.materias.id_materia,
        materia: solicitud.materias.materia,
        id_horario: solicitud.id_horario,
        horario: solicitud.horarios.horario,
        id_modalidad: solicitud.modalidades.id_modalidad,
        modalidad: solicitud.modalidades.modalidad,
        fecha_inicio: solicitud.fecha_inicio,
        id_razon: solicitud.razon_asesoria.id_razon,
        razon: solicitud.razon_asesoria.razon,
        nota_estudiante: solicitud.nota_estudiante,
        explicacion_asesor: solicitud.explicacion_asesor,
        id_estatus_solicitud: solicitud.id_estatus,
        estatus_solicitud: solicitud.estatus_solicitud.estatus_solicitud


    }))


}

async function obtenerSolicitudesPorAsesor(id){

     //traemos las solicitudes que tiene el id del asesor
    const solicitudes = await db.solicitudes_asesorias.findMany({
        where: {id_asesor: id, id_estatus: 3},
        include: {
            estudiante: {
                select: {
                    id_persona: true,
                    nombre: true,
                    apellido_paterno: true,
                    apellido_materno: true,
                    correo: true
                }
            },
            asesor: {
                 select: {
                    id_persona: true,
                    nombre: true,
                    apellido_paterno: true,
                    apellido_materno: true,
                }
            },
            materias: {
                select: {
                    id_materia: true,
                    materia: true
                }
            },
            horarios: true,
            modalidades: true,
            razon_asesoria: true,
            estatus_solicitud: true,
        }
    })

    //hacemos un map para mandar un objeto plano
    return solicitudes.map((solicitud) => ({
        id_solicitud: solicitud.id_solicitud,
        id_asesor: solicitud.id_asesor,
        nombre_asesor: `${solicitud.asesor.nombre} ${solicitud.asesor.apellido_paterno} ${solicitud.asesor.apellido_materno}`,
        id_estudiante: solicitud.id_estudiante,
        nombre_estudiante: `${solicitud.estudiante.nombre} ${solicitud.estudiante.apellido_paterno} ${solicitud.estudiante.apellido_materno}`,
        correo: solicitud.estudiante.correo,
        id_materia: solicitud.materias.id_materia,
        materia: solicitud.materias.materia,
        id_horario: solicitud.id_horario,
        horario: solicitud.horarios.horario,
        id_modalidad: solicitud.modalidades.id_modalidad,
        modalidad: solicitud.modalidades.modalidad,
        fecha_inicio: solicitud.fecha_inicio,
        id_razon: solicitud.razon_asesoria.id_razon,
        razon: solicitud.razon_asesoria.razon,
        nota_estudiante: solicitud.nota_estudiante,
        explicacion_asesor: solicitud.explicacion_asesor,
        id_estatus_solicitud: solicitud.id_estatus,
        estatus_solicitud: solicitud.estatus_solicitud.estatus_solicitud


    }))
}


module.exports = {crearSolicitud, aceptarSolicitud, obtenerPorId, eliminarSolicitud, obtenerTodasLasSolicitudes, obtenerSolicitudesPorAsesor}