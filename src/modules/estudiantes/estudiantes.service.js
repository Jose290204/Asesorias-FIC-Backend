const estudiantesRepository = require("./estudiantes.repository")
const usuariosRepository = require("../usuarios/usuarios.repository")
const db = require("../../config/dbConfig")

async function getEstudiantes(){
    return await estudiantesRepository.getEstudiantes();
}

async function crearEstudiante(data) {

    return await db.$transaction(async (tx) => {
        const nuevaPersona = await estudiantesRepository.crearEstudiante(data, tx);

        const insertarUsuario = {
            id_persona: nuevaPersona.id_persona,
            usuario: parseInt(data.numero_cuenta),
            contrasena: data.contrasena,
            id_rol: 3
        }

        const nuevoUsuario = await usuariosRepository.crearUsuario(insertarUsuario, tx);

        return {nuevaPersona, nuevoUsuario}
    })
}

module.exports = {getEstudiantes, crearEstudiante}