const db = require("../config/dbConfig")

async function crear(data) {


    
}

async function getEstudiantes(){

    const res = await db.query(`
        SELECT 
		p.id_persona as id_persona,
		p.nombre,
		u.usuario as numero_cuenta,
		u.contrasena,
		p.apellido_paterno,
		p.apellido_materno,
		TRIM(COALESCE(p.nombre, '') || ' ' || COALESCE(p.apellido_paterno, '') || ' ' || COALESCE(p.apellido_materno, ''))::character varying as nombre_completo,  
		p.correo,
		p.num_cel,
		p.id_licenciatura,
		p.promedio,
		p.id_grupo
	from personas p
	JOIN usuarios u ON u.id_persona = p.id_persona
	where u.id_rol = 3
	AND p.id_estatus = 1;
        
    `
    );
    return res.rows[0];
}

module.exports = {getEstudiantes}