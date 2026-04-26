const { obtenerSolicitudes, eliminarSolicitud, aceptarSolicitud, crearSolicitud} = require("../../modelos/administrador/solicitudesModelo");
const { param } = require("../../router/administrador/solicitudesRoutes");

exports.obtenerSolicitudes = async (req, res) => {
    try {
        const users = await obtenerSolicitudes();
        res.json(users);
    } catch (err) {
        console.error("Error en el modelo cargar solicitudes:", err.message);
        res.status(500).json({ error: "Error al cargar las solicitudes", details: err.message });
    }
};

exports.eliminarSolicitud = async (req, res) => {
    
    const {id_solicitud, explicacion_asesor} = req.body

    params = {
        id_solicitud,
        explicacion_asesor
    }

    try {
        const users = await eliminarSolicitud(params);
        numReturn = users.fun_eliminar_solicitud_pendiente
        res.json(numReturn);
    } catch (err) {
        console.error("Error en el modelo eliminar solicitud:", err.message);
        res.status(500).json({ error: "Error al eliminar solicitud", details: err.message });
    }
};

exports.aceptarSolicitud = async (req, res) => {
    const {id_solicitud } = req.query


    try {
        const users = await aceptarSolicitud(id_solicitud);
        numReturn = users.fun_aceptar_solicitud_pendiente
        res.json(numReturn);
    } catch (err) {
        console.error("Error en el modelo cargar solicitudes:", err.message);
        res.status(500).json({ error: "Error al cargar las solicitudes", details: err.message });
    }
};

exports.crearSolicitud = async (req, res) => {

    const {
        id_materia,
        id_horario,
        id_modalidad,
        id_estudiante,
        id_asesor,
        fecha_inicio,
        id_razon,
        nota_estudiante,
        explicacion_asesor
    } = req.body;

    const params = {
        id_materia,
        id_horario,
        id_modalidad,
        id_estudiante,
        id_asesor,
        fecha_inicio,
        id_razon,
        nota_estudiante,
        explicacion_asesor
    };

    try {
        const result = await crearSolicitud(params);

        const numReturn = result.fun_crear_solicitud_asesoria;

        res.json(numReturn);
    } catch (err) {
        console.error("Error en el modelo crear solicitud:", err.message);
        res.status(500).json({
            error: "Error al crear solicitud",
            details: err.message
        });
    }
};





