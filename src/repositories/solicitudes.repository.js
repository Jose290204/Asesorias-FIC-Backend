

const db = require("../config/dbConfig")



async function crearSolicitud(data, connection = db) {

        const [dia, mes, anio] = data.fecha_inicio.split('/');
        const fechaFormateada = new Date(`${anio}-${mes}-${dia}`);

        try {
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
        } catch (error) {
            console.error("Error en solicitud", error);
            throw error;
        }
    
}

module.exports = {crearSolicitud}