const { obtenerEstudiantes, crearEstudiante, buscarEstudiantes, editarEstudiante } = require("../../modelos/administrador/estudiantesModelo");
const { param } = require("../../router/administrador/estudiantesRouters");

exports.obtenerEstudiantes = async (req, res) => {
    try {
        const users = await obtenerEstudiantes();
        res.json(users);
    } catch (err) {
        console.error("Error en el modelo cargar asesores par:", err.message);
        res.status(500).json({ error: "Error al cargar los asesores par", details: err.message });
    }
};

exports.crearEstudiante = async (req, res) => {
    
    try {

        
        
        const {nombre, apellido_paterno, apellido_materno, numero_cuenta, contrasena, id_licenciatura,
            id_grupo, correo, num_cel, promedio, id_rol
        } = req.body;

        const params = {
            nombre,
            apellido_paterno,
            apellido_materno,
            numero_cuenta,
            contrasena,
            id_licenciatura,
            id_grupo,
            correo,
            num_cel,
            promedio,
            id_rol
        }

        const respuesta = await crearEstudiante(params);
        const objArray = respuesta[0];
        const numReturn = objArray.fun_crear_estudiante;
        
        res.json(numReturn);
    } catch (err) {
        console.error("Error en el modelo crear estudiante:", err.message);
        res.status(500).json({ error: "Error al crear estudiante", details: err.message });
    }
};

exports.buscarEstudiantes = async (req, res) => {
    try {
        
         const { p_busqueda } = req.query;

         const params = {
            p_busqueda
         }

        const users = await buscarEstudiantes(params);
        res.json(users);
    } catch (err) {
        console.error("Error en el modelo buscar estudiantes", err.message);
        res.status(500).json({ error: "Error al buscar estudiantes", details: err.message });
    }
};

exports.editarEstudiante = async (req, res) => {
    
    try {

        const {id_persona, nombre, apellido_paterno, apellido_materno, numero_cuenta, contrasena, id_licenciatura,
            id_grupo, correo, num_cel, promedio
        } = req.body;

        const params = {
            id_persona,
            nombre,
            apellido_paterno,
            apellido_materno,
            numero_cuenta,
            contrasena,
            id_licenciatura,
            id_grupo,
            correo,
            num_cel,
            promedio
        }

        const respuesta = await editarEstudiante(params);
        const objArray = respuesta[0];
        const numReturn = objArray.fun_editar_estudiante;
        
        res.json(numReturn);
    } catch (err) {
        console.error("Error en el modelo crear estudiante:", err.message);
        res.status(500).json({ error: "Error al crear estudiante", details: err.message });
    }
};

