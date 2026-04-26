const { } = require('../../controladores/administrador/usuariosControlador');
const pool = require('../../dbConfig'); // Importa el pool




async function eliminarUsuario(id_persona) {
   try {
        const registros = (await pool.query(
           'SELECT fun_eliminar_persona($1::int)',
            [id_persona]
        )).rows;
        return registros[0];
    } catch (err) {
        console.error("Error:", err.message);
        throw err;
    }
}

async function iniciarSesion(params) {

    let usuario = params.usuario
    let contrasena = params.contrasena
   
    try {
        const registros = (await pool.query(
           'SELECT fun_iniciar_sesion($1::int, $2::varchar)',
            [usuario, contrasena]
        )).rows;
        return registros[0];
    } catch (err) {
        console.error("Error:", err.message);
        throw err;
    }
}








module.exports = { eliminarUsuario, iniciarSesion};