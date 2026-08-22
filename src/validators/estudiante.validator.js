const joi = require('Joi');

const estudianteSchema = joi.object({
    nombre: joi.
    string().
    trim().
    min(2).
    max(50).
    pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/).
    required().
    messages({
        'string.empty': 'nombre es obligatorio',
        'string.min':'nombre debe tener al menos 3 caracteres',
        'string.max': 'nombre es demasiado largo',
        'string.pattern.base': 'El nombre solo puede contener letras',
        'any.required': 'falta el campo nombre'
    }),
    apellido_paterno: joi.
    string().
    trim().
    min(2).
    max(50).
    pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/).
    required().
    messages({
        'string.empty': 'apellido paterno es obligatorio',
        'string.min':'apellido paterno debe tener al menos 3 caracteres',
        'string.max': 'apellido paterno es demasiado largo',
        'string.pattern.base': 'El apellido paterno solo puede contener letras',
        'any.required': 'falta el campo apellido paterno'
    }),
    apellido_materno: joi.
    string().
    trim().
    min(2).
    max(50).
    pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/).
    required().
    messages({
        'string.empty': 'apellido materno es obligatorio',
        'string.min':'apellido materno debe tener al menos 3 caracteres',
        'string.max': 'apellido materno es demasiado largo',
        'string.pattern.base': 'El apellido materno solo puede contener letras',
        'any.required': 'falta el campo apellido materno'
    }),
    correo: joi.
    string().
    trim().
    lowercase().
    email({
        minDomainSegments: 2, 
        tlds: { allow: ['com', 'mx', 'edu', 'net'] }
    }).
    required().
    messages({
        'string.empty': 'El correo es obligatorio',
        'string.email': 'ingrese un correo electronico valido',
        'any.required': 'El correo es un campo obligatorio'
    }),
    num_cel: joi.
    string().
    trim().
    pattern(/^[+]?[0-9]{10,15}$/).
    required().
    messages({
        'string.pattern.base': 'El numero de celular debe tener minimo 10 digitos',
        'any.required': 'El numero de celular es obligatorio'
    }),
    numero_cuenta: joi.number()
        .integer()
        .min(8)
        .max(12)
        .required()
        .messages({
            'string.empty': 'El número de cuenta no puede estar vacío',
            'string.alphanum': 'El número de cuenta solo debe tener letras y números',
            'string.min': 'El número de cuenta debe tener al menos 8 caracteres',
            'any.required': 'El número de cuenta es un campo obligatorio'
        }), // <--- Coma aquí es vital

    contrasena: joi.string()
        .min(8)
        .max(30)
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])'))
        .required()
        .messages({
            'string.min': 'La contraseña debe tener al menos 8 caracteres',
            'string.pattern.base': 'La contraseña debe tener al menos una mayúscula, una minúscula y un número',
            'any.required': 'La contraseña es obligatoria'
        }), // <--- Otra coma aquí

    id_licenciatura: joi.number().integer().required().messages({
        'number.base': 'La licenciatura debe ser un número',
        'any.required': 'Debes seleccionar una licenciatura'
    }),

    id_grupo: joi.number().integer().required().messages({
        'number.base': 'El grupo debe ser un número',
        'any.required': 'Debes seleccionar un grupo'
    }),

    promedio: joi.number().precision(1).min(0).max(10).required().messages({
        'number.base': 'El promedio debe ser un número',
        'number.min': 'El promedio mínimo es 0',
        'number.max': 'El promedio máximo es 10',
        'any.required': 'El promedio es obligatorio'
    })

});

module.exports = { estudianteSchema }