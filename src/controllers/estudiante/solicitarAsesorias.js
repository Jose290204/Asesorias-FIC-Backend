const { buscarAsesores, filtrosAsesores} = require("../../modelos/estudiante/solicitarAsesorias");




exports.buscarAsesores = async (req, res) => {
    try {

        const users = await buscarAsesores();
        res.json(users);
    } catch (err) {
        console.error("Error en el modelo buscar asesores", err.message);
        res.status(500).json({ error: "Error al buscar asesores", details: err.message });
    }
};

exports.filtrosAsesores = async (req, res) => {

    const { id_materia, id_horario } = req.body

    params = {
        id_materia,
        id_horario
    }

    try {

        const users = await filtrosAsesores(params);
        res.json(users);
    } catch (err) {
        console.error("Error en el modelo buscar asesores", err.message);
        res.status(500).json({ error: "Error al buscar asesores", details: err.message });
    }
};



