const db = require("../../config/dbConfig")
const usuariosRepository = require('./usuarios.repository')

async function UsuarioExiste(usuario) { //funcion para mandar los datos del usuario al controller para comparar con bycrpt las passwords
    try {
        const datosUsuario = await usuariosRepository.buscarUsuarioLogin(usuario)

        console.log(datosUsuario);
        

        return datosUsuario;
    } catch (error) {
        console.error("error al buscar usuario", error)
    }
    
}

module.exports = {UsuarioExiste}