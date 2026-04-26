const { obtenerAsesoresDisci, crearAsesorDisci, editarAsesorDisci, buscarAsesorDisci} = require("../../modelos/administrador/asesoresDisciplinaresModelo");


exports.obtenerAsesoresDisci = async (req, res) => {
    try {
        const users = await obtenerAsesoresDisci();
        res.json(users);
    } catch (err) {
        console.error("Error en el modelo cargar asesores disci:", err.message);
        res.status(500).json({ error: "Error al cargar los asesores disci", details: err.message });
    }
};

exports.crearAsesorDisci = async (req, res) => {
    
    try {

        
        
        const {nombre, apellido_paterno, apellido_materno, numero_cuenta, contrasena, correo, num_cel, materias, horarios
        } = req.body;

        const params = {
            nombre,
            apellido_paterno,
            apellido_materno,
            numero_cuenta,
            contrasena,
            correo,
            num_cel,
            materias,
            horarios
        }

        const respuesta = await crearAsesorDisci(params);
        const objArray = respuesta[0];
        const numReturn = objArray.fun_crear_asesor_disciplinar;
        
        res.json(numReturn);
    } catch (err) {
        console.error("Error en el modelo crear asesor disci", err.message);
        res.status(500).json({ error: "Error al crear asesor disci", details: err.message });
    }
};

exports.buscarAsesorDisci = async (req, res) => {
    try {
        
         const { p_busqueda } = req.query;

         const params = {
            p_busqueda
         }

        const users = await buscarAsesorDisci(params);
        res.json(users);
    } catch (err) {
        console.error("Error en el modelo buscar asesor disci", err.message);
        res.status(500).json({ error: "Error al buscar asesor disci", details: err.message });
    }
};

exports.editarAsesorDisci = async (req, res) => {
    
    try {

        const {id_persona, nombre, apellido_paterno, apellido_materno, numero_cuenta, contrasena, correo, num_cel, materias, horarios
        } = req.body;

        const params = {
            id_persona,
            nombre,
            apellido_paterno,
            apellido_materno,
            numero_cuenta,
            contrasena,
            correo,
            num_cel,
            materias,
            horarios
        }

        const respuesta = await editarAsesorDisci(params);
        const objArray = respuesta[0];
        const numReturn = objArray.fun_editar_asesor_disciplinar;
        
        res.json(numReturn);
    } catch (err) {
        console.error("Error en el modelo editar asesores disci:", err.message);
        res.status(500).json({ error: "Error al editar asesores disci", details: err.message });
    }
};

