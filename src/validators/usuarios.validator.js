const joi = require('Joi');

const usuariosSchema = joi.object({
    usuario: joi.
    string().
    trim().
    max(50).
    required().
    regex(/^[a-zA-Z0-9.]+$/).
    messages({
        'string.empty': 'El usuario no puede estar vacio',
        'string.max': 'El usuario es demasiado largo',
        'string.pattern.base': 'El usuario solo puede contener letras, numeros y puntos',
        'any.required': 'El usuario es un campo requerido'
    }),
    password_hash: joi.
    string().
    trim().
    required().
    messages({
        'string.empty': 'La contraseña no puede estar vacia',
        'any.required': 'La contraseña es un campo requerido'
    })

})

module.exports = {usuariosSchema}