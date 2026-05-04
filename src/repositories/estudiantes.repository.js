

const db = require("../config/dbConfig")



async function crearEstudiante(data, connection = db) {

        try {
            const nuevoEstudiante = await connection.personas.create({
                data: {
                    nombre: data.nombre,
                    apellido_paterno: data.apellido_paterno,
                    apellido_materno: data.apellido_materno,
                    correo: data.correo,
                    num_cel: data.num_cel,
                    id_licenciatura: data.id_licenciatura,
                    promedio: data.promedio,
                    id_grupo: data.id_grupo,
                    id_estatus: 1,
                }
            });
            return nuevoEstudiante;
        } catch (error) {
            console.error("Error en el repository", error);
            throw error;
        }
    
}

async function getEstudiantes(){

  return await db.personas.findMany({
    where: {
        id_estatus: 1,
        usuarios: {
            id_rol: 3
        }
    },
    include: {
        usuarios: true
    }
  });
}

module.exports = {getEstudiantes, crearEstudiante}