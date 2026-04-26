const { } = require('../../controladores/estudiante/solicitarAsesorias');
const pool = require('../../dbConfig'); // Importa el pool

async function buscarAsesores() {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM public.fun_buscar_asesores_estudiante()"
    );
    return rows;
  } catch (err) {
    console.error("Error:", err.message);
    throw err;
  }
}

async function filtrosAsesores(params) {

   let id_materia = params.id_materia;
   let id_horario = params.id_horario;

    try {
        const registros = (await pool.query(
            'SELECT * from fun_filtros_asesores_estudiante($1, $2)',
            [id_materia, id_horario]
        )).rows;
        return registros;
    } catch (err) {
        console.error("Error:", err.message);
        throw err;
    }
}








module.exports = { buscarAsesores, filtrosAsesores};