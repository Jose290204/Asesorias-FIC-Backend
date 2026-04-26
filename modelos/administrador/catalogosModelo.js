const { } = require('../../controladores/administrador/catalogosController');
const pool = require('../../dbConfig'); // Importa el pool




async function obtenerMaterias() {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM public.fun_cargar_materias()"
    );
    return rows;
  } catch (err) {
    console.error("Error:", err.message);
    throw err;
  }
}

async function obtenerHorarios() {
     try {
    const { rows } = await pool.query(
      "SELECT * FROM public.fun_cargar_horarios()"
    );
    return rows;
  } catch (err) {
    console.error("Error:", err.message);
    throw err;
  }
}

async function obtenerGrupos() {
     try {
    const { rows } = await pool.query(
      "SELECT * FROM public.fun_cargar_grupos()"
    );
    return rows;
  } catch (err) {
    console.error("Error:", err.message);
    throw err;
  }
}

async function obtenerLicenciaturas() {
     try {
    const { rows } = await pool.query(
      "SELECT * FROM public.fun_cargar_licenciaturas()"
    );
    return rows;
  } catch (err) {
    console.error("Error:", err.message);
    throw err;
  }
}

async function obtenerModalidades() {
     try {
    const { rows } = await pool.query(
      "SELECT * FROM public.fun_cargar_modalidad()"
    );
    return rows;
  } catch (err) {
    console.error("Error:", err.message);
    throw err;
  }
}

async function obtenerRazones() {
     try {
    const { rows } = await pool.query(
      "SELECT * FROM public.fun_cargar_razones()"
    );
    return rows;
  } catch (err) {
    console.error("Error:", err.message);
    throw err;
  }
}






module.exports = { obtenerMaterias, obtenerHorarios, obtenerGrupos, obtenerLicenciaturas, obtenerModalidades, obtenerRazones};