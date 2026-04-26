const { } = require('../../controladores/administrador/solicitudesControlador');
const pool = require('../../dbConfig'); // Importa el pool




async function obtenerSolicitudes() {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM public.fun_obtener_solicitudes_pendientes()"
    );
    return rows;
  } catch (err) {
    console.error("Error:", err.message);
    throw err;
  }
}

async function eliminarSolicitud(params) {
  
  let id_solicitud = params.id_solicitud
  let explicacion_asesor = params.explicacion_asesor


  try {
    const { rows } = await pool.query(
      "SELECT * FROM public.fun_eliminar_solicitud_pendiente($1, $2::text)",
      [id_solicitud, explicacion_asesor]
    );
    return rows[0];
  } catch (err) {
    console.error("Error:", err.message);
    throw err;
  }
}

async function aceptarSolicitud(id_solicitud) {


  try {
    const { rows } = await pool.query(
      "SELECT * FROM public.fun_aceptar_solicitud_pendiente($1)",
      [id_solicitud]
    );
    return rows[0];
  } catch (err) {
    console.error("Error:", err.message);
    throw err;
  }
}

async function crearSolicitud(params) {

  let id_materia       = params.id_materia;
  let id_horario       = params.id_horario;
  let id_modalidad     = params.id_modalidad;
  let id_estudiante    = params.id_estudiante;
  let id_asesor        = params.id_asesor;
  let fecha_inicio     = params.fecha_inicio; 
  let id_razon         = params.id_razon;
  let nota_estudiante  = params.nota_estudiante;
  let explicacion_asesor = params.explicacion_asesor;

  try {
    const { rows } = await pool.query(
      `SELECT * FROM public.fun_crear_solicitud_asesoria(
        $1, $2, $3, $4, $5, $6::date, $7, $8, $9
      )`,
      [
        id_materia,
        id_horario,
        id_modalidad,
        id_estudiante,
        id_asesor,
        fecha_inicio,
        id_razon,
        nota_estudiante,
        explicacion_asesor
      ]
    );

    return rows[0];
  } catch (err) {
    console.error("Error:", err.message);
    throw err;
  }
}






module.exports = { obtenerSolicitudes, eliminarSolicitud, aceptarSolicitud, crearSolicitud};