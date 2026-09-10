const db = require("../../config/dbConfig")

async function crearAsesoria(data, connection = db){

    const [dia, mes, anio] = data.fecha_inicio.split('/');
    const fechaFormateada = new Date(`${anio}-${mes}-${dia}`);


        const nuevaAsesoria = await connection.asesorias.create({
            data: {
                id_estudiante: parseInt(data.id_estudiante),
                id_asesor: parseInt(data.id_asesor),
                id_materia: parseInt(data.id_materia),
                id_modalidad: parseInt(data.id_modalidad),
                fecha_inicio: fechaFormateada,
                id_razon: parseInt(data.id_razon),
                id_licenciatura: parseInt(data.id_licenciatura),
                sesiones_tomadas: data.sesiones_tomadas,
                observaciones: data.observaciones,
                id_estatus_asesoria: 3,
                id_horario: parseInt(data.id_horario)
            }
        })

        return nuevaAsesoria;
    
}

async function getAsesoriasEnCurso(connection = db) {
    const Asesorias = await connection.asesorias.findMany({
        where: {
            id_estatus_asesoria: 3
        },
        include: {
            material_adicional: true
        }
    })

    return Asesorias;
}

module.exports = { crearAsesoria, getAsesoriasEnCurso }