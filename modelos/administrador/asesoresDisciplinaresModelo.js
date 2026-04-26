const { } = require('../../controladores/administrador/estudiantesControlador');
const pool = require('../../dbConfig'); // Importa el pool




async function obtenerAsesoresDisci() {
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

async function crearAsesorDisci(params) {

    let nombre = params.nombre
    let apellido_paterno = params.apellido_paterno
    let apellido_materno = params.apellido_materno
    let numero_cuenta = params.numero_cuenta
    let contrasena = params.contrasena
    let correo = params.correo
    let num_cel = params.num_cel
    let materias = params.materias;
    let horarios = params.horarios;

    try {
        const registros = (await pool.query(
            'SELECT fun_crear_asesor_disciplinar($1, $2, $3, $4, $5, $6, $7, $8::jsonb, $9::jsonb)',
            [nombre, apellido_paterno, apellido_materno, numero_cuenta, contrasena, 
              correo, num_cel, JSON.stringify(materias), JSON.stringify(horarios)]
        )).rows;
        return registros;
    } catch (err) {
        console.error("Error:", err.message);
        throw err;
    }
}

async function buscarAsesorDisci(params) {

    let p_busqueda = params.p_busqueda
   
    try {
        const registros = (await pool.query(
            'SELECT * FROM fun_buscar_asesor_disciplinar($1)',
            [p_busqueda]
        )).rows;
        return registros;
    } catch (err) {
        console.error("Error:", err.message);
        throw err;
    }
}

async function editarAsesorDisci(params) {

    let id_persona = params.id_persona
    let nombre = params.nombre
    let apellido_paterno = params.apellido_paterno
    let apellido_materno = params.apellido_materno
    let numero_cuenta = params.numero_cuenta
    let contrasena = params.contrasena
    let correo = params.correo
    let num_cel = params.num_cel
    let materias = params.materias
    let horarios = params.horarios

    try {
        const registros = (await pool.query(
           'SELECT fun_editar_asesor_disciplinar($1, $2, $3, $4, $5, $6, $7, $8, $9::jsonb, $10::jsonb)',
            [id_persona, nombre, apellido_paterno, apellido_materno, numero_cuenta, contrasena, 
              correo, num_cel, JSON.stringify(materias), JSON.stringify(horarios)]
        )).rows;
        return registros;
    } catch (err) {
        console.error("Error:", err.message);
        throw err;
    }
}



module.exports = { obtenerAsesoresDisci, crearAsesorDisci, editarAsesorDisci, buscarAsesorDisci};