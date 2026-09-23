
const db = require("../../config/dbConfig")


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

async function obtenerDatosAsesor(id_asesor){

    //traemos todos los datos del asesor
    const dataExtensa = await db.personas.findUnique({
        where: { id_persona: id_asesor }
    })

    //creamos el objeto que regresaremos al service
    const datosAsesor = {
        id_asesor: dataExtensa.id_persona,
        nombre_completo: `${dataExtensa.nombre} ${dataExtensa.apellido_paterno} ${dataExtensa.apellido_materno}`,
        numero_cuenta: dataExtensa.numero_cuenta,
        correo: dataExtensa.correo
    }

    //retornamos los datos listos y limpios
    return datosAsesor;
}

//funcion para traer las materias enlazadas al asesor
async function obtenerMateriasAsesor(id_asesor){

    //traemos todas las materias del asesor
    const datosMaterias = await db.disponibilidad_materias.findMany({
        where: { id_asesor: id_asesor },
        include: {
            materias: true
        }
    })

    

    const materiasAsesor = datosMaterias.map((materia) => ({
        id_disponibilidad_mat: materia.id_disponibilidad_mat,
        id_asesor: materia.id_asesor,
        id_materia: materia.id_materia,
        materia: materia.materias.materia,
         id_licenciatura: materia.materias.id_licenciatura 
    }))

    return materiasAsesor
}

//funcion para traer los horarios enlazados al asesor
async function obtenerHorariosAsesor(id_asesor){

   //traemos todos los horarios del asesor
    const datosHorarios = await db.disponibilidad_horarios.findMany({
        where: { id_asesor: id_asesor },
        include: {
            horarios: true
        }
    })

    

    const horariosAsesor = datosHorarios.map((horario) => ({
        id_disponibilidad_hor: horario.id_disponibilidad_hor,
        id_asesor: horario.id_asesor,
        id_horario: horario.id_horario,
        horario: horario.horarios.horario
    }))

    return horariosAsesor

}

async function actualizarMaterias(id_asesor, materias, client = db) {
    // eliminamos todas las materias que sean del asesor seleccionado
    await client.disponibilidad_materias.deleteMany({
        where: { id_asesor: id_asesor }
    });

    let materiasAgregadas = [];

    // si hay materias en la lista, insertamos
    if (materias.length > 0) {
        materiasAgregadas = await client.disponibilidad_materias.createMany({
            data: materias.map((materia) => ({ id_asesor, id_materia: materia.id_materia }))
        });
    }

    return materiasAgregadas;
}

async function actualizarHorarios(id_asesor, horarios, client = db) {
    // eliminamos todos los horarios que sean del asesor seleccionado
    await client.disponibilidad_horarios.deleteMany({
        where: { id_asesor: id_asesor }
    });

    let horariosAgregados = [];

    // si hay horarios en la lista, insertamos
    if (horarios.length > 0) {
        horariosAgregados = await client.disponibilidad_horarios.createMany({
            data: horarios.map((horario) => ({ id_asesor, id_horario: horario.id_horario }))
        });
    }

    return horariosAgregados;
}





module.exports = {getAsesores, obtenerDatosAsesor, obtenerMateriasAsesor, obtenerHorariosAsesor, actualizarMaterias, actualizarHorarios};