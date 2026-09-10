const usuariosService = require('./usuarios.service');
const { usuariosSchema } = require('./usuarios.validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const login = async(req, res) => {
    const {error, value} = usuariosSchema.validate(req.body) //se validan los datos que vienen con joi

    if(error){ //si hay algun error en la validaciones aqui salta
        return res.status(400).json({
            success: false,
            message: 'datos de entrada invalidos',
            details: error.details[0].message
        })
    }

    try {
        const credencialesUsuario = value //los datos que ingreso el usuario
        const usuarioExiste = await usuariosService.UsuarioExiste(credencialesUsuario.usuario)
        const datosPersona = usuarioExiste.datos_persona //los datos personales del usuario

        if(!usuarioExiste){ //si el usuario no existe 
            return res.status(401).json({message: "el usuario no existe, ingrese un usuario nuevo"})
        }

        const passwordValida = await bcrypt.compare(credencialesUsuario.password_hash, usuarioExiste.password_hash); // se compara lo que ingreso el usuario con lo de la bd

        if(!passwordValida){ //si la contrase;a no coincide
            return res.status(401).json({message: "contraseña incorrecta, ingrese otra contraseña"})
        }

        const payload = {
            id_usuario: usuarioExiste.id_usuario,
            usuario: usuarioExiste.usuario,
            id_rol: usuarioExiste.id_rol,
            nombre_completo: datosPersona.nombre + " " + datosPersona.apellido_paterno + " " + datosPersona.apellido_materno
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h'});

        //login exitoso
        return res.status(200).json({
            success: true,
            message: "Inicio de sesion exitoso",
            token: token,
            usuario: payload
        })

        
    } catch (error) {
        console.error("error en login", error);
        return res.status(500).json({message: "hubo un error interno en el servidor"})
    }
};

module.exports = {login}