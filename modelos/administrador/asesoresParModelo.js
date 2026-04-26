const { } = require('../../controladores/administrador/asesoresParControlador');
const pool = require('../../dbConfig'); // Importa el pool




async function obtenerAsesoresPar() {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM public.fun_obtener_asesores_par()"
    );
    return rows;
  } catch (err) {
    console.error("Error:", err.message);
    throw err;
  }
}

async function crearAsesorPar(params) {

    let id_persona = params.id_persona;
    let materias = params.materias;
    let horarios = params.horarios;

    try {
        const registros = (await pool.query(
            'SELECT fun_crear_asesor_par($1, $2::jsonb, $3::jsonb)',
            [id_persona, JSON.stringify(materias), JSON.stringify(horarios)]
        )).rows;
        return registros;
    } catch (err) {
        console.error("Error:", err.message);
        throw err;
    }
}

async function editarAsesorPar(params) {

    let id_persona = params.id_persona;
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
    let materias = params.materias;
    let horarios = params.horarios;

    try {
        const registros = (await pool.query(
            'SELECT fun_editar_asesor_par($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12::jsonb, $13::jsonb)',
            [id_persona, nombre, apellido_paterno, apellido_materno, numero_cuenta, contrasena, 
              id_licenciatura, id_grupo, correo, num_cel, promedio, JSON.stringify(materias), JSON.stringify(horarios)]
        )).rows;
        return registros;
    } catch (err) {
        console.error("Error:", err.message);
        throw err;
    }
}




module.exports = { obtenerAsesoresPar, crearAsesorPar, editarAsesorPar};