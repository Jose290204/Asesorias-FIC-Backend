const { obtenerAsesoresPar, crearAsesorPar,editarAsesorPar } = require("../../modelos/administrador/asesoresParModelo");

exports.obtenerAsesoresPar = async (req, res) => {
    try {
        const users = await obtenerAsesoresPar();
        res.json(users);
    } catch (err) {
        console.error("Error en el modelo cargar asesores par:", err.message);
        res.status(500).json({ error: "Error al cargar los asesores par", details: err.message });
    }
};

exports.crearAsesorPar = async (req, res) => {
    
    try {

        
        
        const {id_persona, materias, horarios} = req.body;

        const params = {
            id_persona,
            materias,
            horarios
        }

        const respuesta = await crearAsesorPar(params);
        const objArray = respuesta[0];
        const numReturn = objArray.fun_crear_asesor_par;


        

        
        res.json(numReturn);
    } catch (err) {
        console.error("Error en el modelo crear asesores:", err.message);
        res.status(500).json({ error: "Error al crear asesor par", details: err.message });
    }
};

exports.editarAsesorPar = async (req, res) => {
    
    try {

        
        
        const {id_persona, nombre, apellido_paterno, apellido_materno, numero_cuenta, contrasena, id_licenciatura,
            id_grupo, correo, num_cel, promedio, materias, horarios
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
            promedio,
            materias,
            horarios
        }

        const respuesta = await editarAsesorPar(params);
        const objArray = respuesta[0];
        const numReturn = objArray.fun_editar_asesor_par;
        
        res.json(numReturn);
    } catch (err) {
        console.error("Error en el modelo editar asesores:", err.message);
        res.status(500).json({ error: "Error al editar asesor par", details: err.message });
    }
};


