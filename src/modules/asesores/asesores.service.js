const db = require("../../config/dbConfig")
const asesoresRepository = require('./asesores.repository')

function obtenerNombreLicenciatura(id_licenciatura) {
    switch (id_licenciatura) {
        case 1:
            return 'Informática';
        case 2:
            return 'Informática Virtual';
        case 3:
            return 'Ciencia de Datos';
        case 4:
            return 'ITSE'
        default:
            return '';
    }
}

async function traerAsesores() { //funcion para mandar los datos del usuario al controller para comparar con bycrpt las passwords
    try {
        const datosBD = await asesoresRepository.getAsesores();

        const asesores = datosBD.map(asesor => {
            return {
                id_persona: asesor.id_persona,
                nombre: asesor.nombre,
                apellido_paterno: asesor.apellido_paterno,
                apellido_materno: asesor.apellido_materno,
                correo: asesor.correo,
                materias: asesor.disponibilidad_materias.map(dm => ({
                id_materia: dm.id_materia || (dm.materias ? dm.materias.id_materia : null),
                materia: dm.materia || (dm.materias ? dm.materias.materia : '')
                })),
                horarios: asesor.disponibilidad_horarios.map(dh => ({
                id_horario: dh.id_horario || (dh.horarios ? dh.horarios.id_horario : null),
                horario: dh.horario || (dh.horarios ? dh.horarios.horario : '')
                }))
            }
        })

        return asesores;
    } catch (error) {
        console.error("error al buscar asesores", error)
    }
    
}

async function getPerfilAsesor(id_asesor){


    // se traen todos los datos
    const [datosAsesor, materiasAsesor, horariosAsesor] = await Promise.all([
        asesoresRepository.obtenerDatosAsesor(id_asesor),
        asesoresRepository.obtenerMateriasAsesor(id_asesor),
        asesoresRepository.obtenerHorariosAsesor(id_asesor)
    ])

    log

    if(!datosAsesor){
        const error = new Error('Asesor no encontrado')
        error.status = 404
        throw error;
    }

     // concatenamos el nombre de la licenciatura a cada materia
    const materiasConLicenciatura = materiasAsesor.map((materia) => ({
        ...materia,
        materia: `${materia.materia} - ${obtenerNombreLicenciatura(materia.id_licenciatura)}`
    }));

    return {
        datosAsesor,
        materiasAsesor: materiasConLicenciatura,
        horariosAsesor
    }
}

async function actualizarMateriasYHorarios(id_asesor, materias, horarios) {
    await db.$transaction(async (tx) => {
        await asesoresRepository.actualizarMaterias(id_asesor, materias, tx);
        await asesoresRepository.actualizarHorarios(id_asesor, horarios, tx);
    });
}

module.exports = {traerAsesores, getPerfilAsesor, actualizarMateriasYHorarios}
