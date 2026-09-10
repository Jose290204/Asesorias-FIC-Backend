const db = require("../../config/dbConfig")
const asesoresRepository = require('./asesores.repository')

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

module.exports = {traerAsesores}
