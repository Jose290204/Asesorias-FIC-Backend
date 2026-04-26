const { eliminarUsuario, iniciarSesion} = require("../../modelos/administrador/usuariosModelo");
const { param } = require("../../router/administrador/usuariosRoutes");



exports.eliminarUsuario = async (req, res) => {
    try {
        
         const { id_persona } = req.query;
       
        const response = await eliminarUsuario(id_persona);
        numReturn = response.fun_eliminar_persona
        res.json(numReturn);
    } catch (err) {
        console.error("Error en el modelo usuarios", err.message);
        res.status(500).json({ error: "Error al eliminar usuario", details: err.message });
    }
};

exports.iniciarSesion = async (req, res) => {
    try {
        
         const { usuario, contrasena } = req.body;

         params = {
            usuario,
            contrasena
         }
       
        const response = await iniciarSesion(params);
        numReturn = response.fun_iniciar_sesion
        res.json(numReturn);
    } catch (err) {
        console.error("Error en el modelo usuarios", err.message);
        res.status(500).json({ error: "Error al iniciar sesion", details: err.message });
    }
};


