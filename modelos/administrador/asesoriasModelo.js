const { } = require('../../controladores/administrador/asesoriasControlador');
const pool = require('../../dbConfig'); 




async function obtenerAsesorias() {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM public.fun_obtener_asesorias_en_curso()"
    );
    return rows;
  } catch (err) {
    console.error("Error:", err.message);
    throw err;
  }
}

async function crearAsesoria(params) {

    let id_estudiante = params.id_estudiante;
    let id_asesor = params.id_asesor;
    let id_materia = params.id_materia;
    let id_modalidad = params.id_modalidad;
    let fecha_inicio = params.fecha_inicio;
    let id_razon = params.id_razon;
    let id_horario = params.id_horario
   

    try {
        const registros = (await pool.query(
            'SELECT fun_crear_asesoria($1, $2, $3, $4, $5, $6, $7)',
            [id_estudiante, id_asesor, id_materia, id_modalidad, fecha_inicio, id_razon, id_horario]
        )).rows;
        return registros[0];
    } catch (err) {
        console.error("Error:", err.message);
        throw err;
    }
}

async function completarAsesoria(id_asesoria) {

  

    try {
        const registros = (await pool.query(
            'SELECT fun_completar_asesoria_en_curso($1)',
            [id_asesoria]
        )).rows;
        return registros;
    } catch (err) {
        console.error("Error:", err.message);
        throw err;
    }
}

async function eliminarAsesoria(id_asesoria) {

   

    try {
        const registros = (await pool.query(
            'SELECT fun_eliminar_asesoria_en_curso($1) As resultado',
            [id_asesoria]
        )).rows;
        return registros[0].resultado;
    } catch (err) {
        console.error("Error:", err.message);
        throw err;
    }
}

async function asesoresTodos() {

    try {
        const registros = (await pool.query(
            'SELECT * FROM fun_obtener_asesores_todos()'
        )).rows;
        return registros;
    } catch (err) {
        console.error("Error:", err.message);
        throw err;
    }
}

async function editarAsesoria(params) {

    let id_asesoria = params.id_asesoria;
    let id_materia = params.id_materia;
    let id_modalidad = params.id_modalidad;
    let fecha_inicio = params.fecha_inicio;
    let id_razon = params.id_razon;
    let sesiones_tomadas = params.sesiones_tomadas;
    let observaciones = params.observaciones;
    let id_horario = params.id_horario
   

    try {
        const registros = (await pool.query(
            'SELECT fun_editar_asesoria($1, $2, $3, $4, $5, $6, $7, $8, $9)',
            [id_asesoria, id_materia, id_modalidad, fecha_inicio, id_razon, sesiones_tomadas, observaciones, id_horario]
        )).rows;
        return registros[0];
    } catch (err) {
        console.error("Error:", err.message);
        throw err;
    }
}

async function obtenerAsesoriasCompletadas() {

    try {
        const registros = (await pool.query(
            'SELECT * FROM fun_obtener_asesorias_en_curso_completadas()'
        )).rows;
        return registros;
    } catch (err) {
        console.error("Error:", err.message);
        throw err;
    }
}






module.exports = {obtenerAsesorias, crearAsesoria, completarAsesoria, eliminarAsesoria, asesoresTodos, editarAsesoria, obtenerAsesoriasCompletadas};