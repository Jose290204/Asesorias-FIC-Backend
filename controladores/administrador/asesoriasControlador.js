const { obtenerAsesorias, crearAsesoria, completarAsesoria, eliminarAsesoria, asesoresTodos, editarAsesoria, obtenerAsesoriasCompletadas} = require("../../modelos/administrador/asesoriasModelo");

exports.obtenerAsesorias = async (req, res) => {
    try {
        const users = await obtenerAsesorias();
        res.json(users);
    } catch (err) {
        console.error("Error en el modelo cargar asesorias:", err.message);
        res.status(500).json({ error: "Error al cargar las asesorias", details: err.message });
    }
};

exports.crearAsesoria = async (req, res) => {
    
    try {

        
        
        const {id_estudiante, id_asesor, id_materia, id_modalidad, fecha_inicio, id_razon, id_licenciatura, id_horario} = req.body;

        const params = {
           id_estudiante,
           id_asesor,
           id_materia,
           id_modalidad,
            fecha_inicio,
           id_razon,
           id_licenciatura,
           id_horario
        }

        const respuesta = await crearAsesoria(params);
        const numReturn = respuesta.fun_crear_asesoria;

        res.json(numReturn);
    } catch (err) {
        console.error("Error en el modelo crear asesorias:", err.message);
        res.status(500).json({ error: "Error al crear asesoria", details: err.message });
    }
};

exports.completarAsesoria = async (req, res) => {
    
    try {

        
        
        const {id_asesoria} = req.query;

       

        const respuesta = await completarAsesoria(id_asesoria);
        const numReturn = respuesta.fun_completar_asesoria_en_curso;

        res.json(numReturn);
    } catch (err) {
        console.error("Error en el modelo completar asesoria:", err.message);
        res.status(500).json({ error: "Error al completar asesoria", details: err.message });
    }
};

exports.eliminarAsesoria = async (req, res) => {
    
    try {

        
        
        const {id_asesoria} = req.query;

        
        const respuesta = await eliminarAsesoria(id_asesoria);
        const numReturn = respuesta.fun_eliminar_asesoria_en_curso;

        res.json(numReturn);
    } catch (err) {
        console.error("Error en el modelo eliminar asesoria:", err.message);
        res.status(500).json({ error: "Error al eliminar asesoria", details: err.message });
    }
};

exports.obtenerAsesoresTodos = async (req, res) => {
    try {
        const users = await asesoresTodos();
        res.json(users);
    } catch (err) {
        console.error("Error en el modelo cargar todos los asesores:", err.message);
        res.status(500).json({ error: "Error al cargar los asesores", details: err.message });
    }
};

exports.editarAsesoria = async (req, res) => {
    try {

        
        const {
            id_asesoria,
            id_materia,
            id_modalidad,
            fecha_inicio,
            id_razon,
            sesiones_tomadas,
            observaciones,
            id_horario
        } = req.body;

        
        const params = {
            id_asesoria,
            id_materia,
            id_modalidad,
            fecha_inicio,
            id_razon,
            sesiones_tomadas,
            observaciones,
            id_horario
        };

        
        const respuesta = await editarAsesoria(params);

        
        const numReturn = respuesta.fun_editar_asesoria;

        res.json(numReturn);

    } catch (err) {
        console.error("Error en el controller editar asesoria:", err.message);
        res.status(500).json({
            error: "Error al editar asesoría",
            details: err.message
        });
    }
};

exports.obtenerAsesoriasCompletadas = async (req, res) => {
    try {
        const users = await obtenerAsesoriasCompletadas();
        res.json(users);
    } catch (err) {
        console.error("Error en el modelo cargar todos los asesores:", err.message);
        res.status(500).json({ error: "Error al cargar los asesores", details: err.message });
    }
};




