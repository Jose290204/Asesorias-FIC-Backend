const usuariosService = require('./usuarios.service');
const { usuariosSchema } = require('./usuarios.validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const login = async(req, res) => {
    const {error, value} = usuariosSchema.validate(req.body)

    if(error){
        return res.status(400).json({
            success: false,
            message: 'datos de entrada invalidos',
            details: error.details[0].message
        })
    }

    try {
        const credencialesUsuario = value
        const usuarioExiste = await usuariosService.UsuarioExiste(credencialesUsuario.usuario)

        if(!usuarioExiste){
            return res.status(401).json({message: "usuario o contraseña incorrectos"})
        }

        const datosPersona = usuarioExiste.datos_persona

        const passwordValida = await bcrypt.compare(credencialesUsuario.password_hash, usuarioExiste.password_hash);

        if(!passwordValida){
            return res.status(401).json({message: "usuario o contraseña incorrectos"})
        }

        const payload = {
            id_usuario: usuarioExiste.id_usuario,
            usuario: usuarioExiste.usuario,
            id_rol: usuarioExiste.id_rol,
            nombre_completo: datosPersona.nombre + " " + datosPersona.apellido_paterno + " " + datosPersona.apellido_materno
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h'});

        // =====aquí guardamos el token en una cookie=====
        res.cookie('accessToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 2 * 60 * 60 * 1000
        });
        // =======================================================================================

        //login exitoso
        return res.status(200).json({
            success: true,
            message: "Inicio de sesion exitoso",
            usuario: {
                id_usuario: usuarioExiste.id_usuario,
                usuario: usuarioExiste.usuario,
                id_rol: usuarioExiste.id_rol,
                nombre_completo: payload.nombre_completo
            }
        })

    } catch (error) {
        console.error("error en login", error);
        return res.status(500).json({message: "hubo un error interno en el servidor"})
    }
};

const getPerfil = async (req, res) => {
    // req.usuario ya viene poblado por el middleware verificarToken
    return res.status(200).json({
        success: true,
        usuario: req.usuario
    });
};

const logout = (req, res) => {
    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    });

    return res.status(200).json({
        success: true,
        message: "Sesión cerrada correctamente"
    });
};

module.exports = {login, getPerfil, logout}