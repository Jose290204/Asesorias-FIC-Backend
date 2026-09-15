const db = require("../../config/dbConfig")
const asesoriasRepository = require('./asesorias.repository')

async function crearAsesoria(data) { //funcion para mandar los datos del usuario al controller para comparar con bycrpt las passwords

    try {
        const nuevaAsesoria = await asesoriasRepository.crearAsesoria(data);

        

        return nuevaAsesoria;
    } catch (error) {
        console.error("error al crear asesoria", error)
        throw error;
    }
    
}

async function getAsesoriasActivas() {
  const asesorias = await asesoriasRepository.getAsesoriasEnCurso();

  return asesorias.map(item => {
    // 1. Extraemos 'horarios' junto con las demás relaciones
    const { estudiante, asesor, materias, horarios, ...restoDeCampos } = item;

    // 2. Formateamos los nombres completos
    const estudianteNombre = estudiante 
      ? `${estudiante.nombre} ${estudiante.apellido_paterno} ${estudiante.apellido_materno || ''}`.trim() 
      : 'Sin asignar';

    const asesorNombre = asesor 
      ? `${asesor.nombre} ${asesor.apellido_paterno} ${asesor.apellido_materno || ''}`.trim() 
      : 'Sin asignar';

    // 3. Devolvemos el objeto plano con la propiedad 'horario' agregada
    return {
      ...restoDeCampos, // Conserva id_asesoria, id_estudiante, fecha_inicio, etc.
      estudiante: estudianteNombre,
      asesor: asesorNombre,
      materia: materias?.materia || '',
      horario: horarios?.horario || 'Sin horario asignado' // 👈 Horario en texto plano
    };
  });
}

async function finalizarAsesoria(idAsesoria) {



     const asesoriaExistente = await asesoriasRepository.obtenerPorId(idAsesoria);

    // validar si la asesoria no existe
    if(!asesoriaExistente){
        const error = new Error("La asesoria especificada no existe")
        error.status = 404;
        throw error;
    }

    if(asesoriaExistente.id_estatus_asesoria === 2){
        const error = new Error("La asesoria ya ha sido completada previamente");
        error.status = 400;
        throw error;
    }

    //si pasa las validaciones, se ejecuta la actualizacion de la asesoria
    const asesoria = await asesoriasRepository.completarAsesoria(idAsesoria);

    return asesoria
}

async function eliminarAsesoria(idAsesoria) {
    
    const asesoriaExistente = await asesoriasRepository.obtenerPorId(idAsesoria);

    // validar si la asesoria no existe
    if(!asesoriaExistente){
        const error = new Error("La asesoria especificada no existe")
        error.status = 404;
        throw error;
    }

    if(asesoriaExistente.id_estatus_asesoria === 2){
        const error = new Error("La asesoria ya ha sido eliminada previamente");
        error.status = 400;
        throw error;
    }

    //si pasa las validaciones, se ejecuta la actualizacion de la asesoria
    const asesoria = await asesoriasRepository.eliminarAsesoria(idAsesoria);

    return asesoria
}

async function editarAsesoria(id,data) {



  // traer los datos de la asesoria existente
  const asesoriaExistente = await asesoriasRepository.obtenerPorId(id);

  // vaiidar si existe la asesoria
  if (!asesoriaExistente) {
    const error = new Error("La asesoría especificada no existe");
    error.status = 404;
    throw error;
  }

  // Validar que no se pueda editar una asesoria cancelada
  if (asesoriaExistente.id_estatus_asesoria === 2) {
    const error = new Error("No se puede editar una asesoría que ha sido cancelada");
    error.status = 400;
    throw error;
  }


  // Mandar los datos procesados al Repository
  return await asesoriasRepository.editarAsesoria(id, data);
}

module.exports = {crearAsesoria, getAsesoriasActivas, finalizarAsesoria, eliminarAsesoria, editarAsesoria}