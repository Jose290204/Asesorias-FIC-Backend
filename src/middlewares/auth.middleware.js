const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    // el token ahora viene de la cookie, no del header
    const token = req.cookies.accessToken;

    // si no se mandó ninguna cookie con el token, salta el error
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Acceso denegado. No se proporciono un token de seguridad'
        });
    }

    try {
        // se valida si el token es valido usando la clave secreta
        const usuarioVerificado = jwt.verify(token, process.env.JWT_SECRET);

        // Guardamos los datos del usuario dentro de la petición (req) para que el controlador sepa quién es
        req.usuario = usuarioVerificado;

        next();
    } catch (error) {
        // si el token fue alterado, viejo o no coincidio con la clave, se manda el error
        return res.status(403).json({
            success: false,
            message: 'token invalido o expirado'
        });
    }
}

module.exports = { verificarToken }