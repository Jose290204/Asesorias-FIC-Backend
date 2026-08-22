const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    //buscar token e los headers de la peticion
    const authHeader = req.headers['authorization'];

    //separar el bearer del token
    const token = authHeader && authHeader.split(' ')[1];

    //si no se mando ningun token, salta el error
    if(!token){
        return res.status(401).json({
            success: false,
            message: 'Acceso denegado. No se proporciono un token de seguridad'
        });
    }

    try {
        //se valida si el token es valido usando la clave secreta
        const usuarioVerificado = jwt.verify(token, process.env.JWT_SECRET);

        //Guardamos los datos del usuario dentro de la petición (req) para que el controlador sepa quién es
        req.usuario = usuarioVerificado;

        next(); //
    } catch (error) {
        //si el token fue alterado, viejo o no coincidio con la clave, se manda el error
        return res.status(403).json({
            success: false,
            message: 'token invalido o expirado'
        })
    }
}

module.exports = {verificarToken}