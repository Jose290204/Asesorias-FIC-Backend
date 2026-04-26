const { obtenerMaterias, obtenerHorarios, obtenerGrupos, obtenerLicenciaturas, obtenerModalidades, obtenerRazones } = require("../../modelos/administrador/catalogosModelo");

exports.obtenerMaterias = async (req, res) => {
    try {
        const users = await obtenerMaterias();
        res.json(users);
    } catch (err) {
        console.error("Error en el modelo cargar materias:", err.message);
        res.status(500).json({ error: "Error al cargar las materias", details: err.message });
    }
};

exports.obtenerHorarios = async (req, res) => {
    try {
        const users = await obtenerHorarios();
        res.json(users);
    } catch (err) {
        console.error("Error en el modelo cargar horarios", err.message);
        res.status(500).json({ error: "Error al cargar horarios", details: err.message });
    }
};

exports.obtenerGrupos = async (req, res) => {
    try {
        const users = await obtenerGrupos();
        res.json(users);
    } catch (err) {
        console.error("Error en el modelo cargar grupos", err.message);
        res.status(500).json({ error: "Error al cargar grupos", details: err.message });
    }
};

exports.obtenerLicenciaturas = async (req, res) => {
    try {
        const users = await obtenerLicenciaturas();
        res.json(users);
    } catch (err) {
        console.error("Error en el modelo cargar licenciaturas", err.message);
        res.status(500).json({ error: "Error al cargar licenciaturas", details: err.message });
    }
};

exports.obtenerModalidades = async (req, res) => {
    try {
        const users = await obtenerModalidades();
        res.json(users);
    } catch (err) {
        console.error("Error en el modelo cargar modalides", err.message);
        res.status(500).json({ error: "Error al cargar modalidades", details: err.message });
    }
};

exports.obtenerRazones = async (req, res) => {
    try {
        const users = await obtenerRazones();
        res.json(users);
    } catch (err) {
        console.error("Error en el modelo cargar razones", err.message);
        res.status(500).json({ error: "Error al cargar razones", details: err.message });
    }
};





