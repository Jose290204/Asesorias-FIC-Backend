const { } = require('../../controladores/administrador/estudiantesControlador');
const pool = require('../../dbConfig'); // Importa el pool




async function obtenerEstudiantes() {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM public.fun_obtener_estudiantes()"
    );
    return rows;
  } catch (err) {
    console.error("Error:", err.message);
    throw err;
  }
}

async function crearEstudiante(params) {

    let nombre = params.nombre
    let apellido_paterno = params.apellido_paterno
    let apellido_materno = params.apellido_materno
    let numero_cuenta = params.numero_cuenta
    let contrasena = params.contrasena
    let id_licenciatura = params.id_licenciatura
    let id_grupo = params.id_grupo
    let correo = params.correo
    let num_cel = params.num_cel
    let promedio = params.promedio
    let id_rol = params.id_rol

    try {
        const registros = (await pool.query(
            'SELECT fun_crear_estudiante($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
            [nombre, apellido_paterno, apellido_materno, numero_cuenta, contrasena, 
              id_licenciatura, id_grupo, correo, num_cel, promedio, id_rol]
        )).rows;
        return registros;
    } catch (err) {
        console.error("Error:", err.message);
        throw err;
    }
}

async function buscarEstudiantes(params) {

    let p_busqueda = params.p_busqueda
   
    try {
        const registros = (await pool.query(
            'SELECT * FROM fun_buscar_estudiantes($1)',
            [p_busqueda]
        )).rows;
        return registros;
    } catch (err) {
        console.error("Error:", err.message);
        throw err;
    }
}

async function editarEstudiante(params) {

    let id_persona = params.id_persona
    let nombre = params.nombre
    let apellido_paterno = params.apellido_paterno
    let apellido_materno = params.apellido_materno
    let numero_cuenta = params.numero_cuenta
    let contrasena = params.contrasena
    let id_licenciatura = params.id_licenciatura
    let id_grupo = params.id_grupo
    let correo = params.correo
    let num_cel = params.num_cel
    let promedio = params.promedio

    try {
        const registros = (await pool.query(
            'SELECT fun_editar_estudiante($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
            [id_persona, nombre, apellido_paterno, apellido_materno, numero_cuenta, contrasena, 
              id_licenciatura, id_grupo, correo, num_cel, promedio]
        )).rows;
        return registros;
    } catch (err) {
        console.error("Error:", err.message);
        throw err;
    }
}



module.exports = { obtenerEstudiantes, crearEstudiante, buscarEstudiantes, editarEstudiante};