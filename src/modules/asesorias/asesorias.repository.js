const { date } = require("joi");
const db = require("../../config/dbConfig")

async function crearAsesoria(data, client = db){

    


        const nuevaAsesoria = await client.asesorias.create({
            data: {
                id_estudiante: parseInt(data.id_estudiante),
                id_asesor: parseInt(data.id_asesor),
                id_materia: parseInt(data.id_materia),
                id_modalidad: parseInt(data.id_modalidad),
                fecha_inicio: data.fecha_inicio,
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
      material_adicional: true,
      materias: {
        select: {
          materia: true
        }
      },
      estudiante: {
        select: {
          nombre: true,
          apellido_paterno: true,
          apellido_materno: true
        }
      },
      asesor: {
        select: {
          nombre: true,
          apellido_paterno: true,
          apellido_materno: true
        }
      },
      horarios: {
        select: {
          horario: true
        }
      }
    }
  });

  return Asesorias;
}

async function completarAsesoria(idAsesoria, connection = db){


    // se hace el update a la asesoria 
    const asesoriaActualizada = await connection.asesorias.update({
        where: {
            id_asesoria: Number(idAsesoria)
        },
        data: {
            id_estatus_asesoria: 1, // se cambia a completada
            fecha_fin: new Date()
        }
    });

    return asesoriaActualizada;

}

async function eliminarAsesoria(idAsesoria){
    // se hace el update a la asesoria 
    const asesoriaActualizada = await db.asesorias.update({
        where: {
            id_asesoria: Number(idAsesoria)
        },
        data: {
            id_estatus_asesoria: 2 //se cambia a eliminada
        }
    });

    return asesoriaActualizada;
}

async function obtenerPorId(idAsesoria) {
    
    const asesoriaExistente = await db.asesorias.findUnique({
        where: { id_asesoria: Number(idAsesoria) }
    })

    return asesoriaExistente;

}

async function editarAsesoria(idAsesoria, data){

     const [dia, mes, anio] = data.fecha_inicio.split('/');
    const fechaFormateada = new Date(`${anio}-${mes}-${dia}`);

        const asesoriaActualizada = await db.asesorias.update({
            where: { id_asesoria: parseInt(idAsesoria) },
            data: {
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

        return asesoriaActualizada;
    
}

async function guardarMaterialAdicional(data) {
  return await db.material_adicional.create({
    data: {
            id_asesoria: data.id_asesoria,
            nombre_archivo: data.nombre_archivo,
            drive_file_id: data.drive_file_id,
            url_archivo: data.url_archivo,
            mime_type: data.mime_type,
            tamano_archivo: data.tamano_archivo,
        },
  })
}

const obtenerMaterialPorId = async (id_material) => {
    return await db.material_adicional.findUnique({
        where: { id_material: Number(id_material) }
    });
};

const eliminarMaterialBD = async (id_material) => {
    return await db.material_adicional.delete({
        where: { id_material: Number(id_material) }
    });
};

module.exports = { crearAsesoria, getAsesoriasEnCurso, completarAsesoria, eliminarAsesoria, obtenerPorId, editarAsesoria, guardarMaterialAdicional, 
  obtenerMaterialPorId, eliminarMaterialBD
 }