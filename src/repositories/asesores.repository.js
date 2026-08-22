
const db = require("../config/dbConfig")


async function getAsesores(){
    
    try {
        return await db.personas.findMany({
            where: {
                id_estatus: 1,
                usuario_rel: {
                    id_rol: {
                        in: [3, 5]
                    }
                }
            },
            include: {
                disponibilidad_materias: {
                    include: {
                        materias: true
                    }
                },
                disponibilidad_horarios: {
                    include: {
                        horarios: true
                    }
                }
            }
        });
    } catch (error) {
         console.error("Error buscando asesores", error);
        throw error
    }

  
}


module.exports = {getAsesores};