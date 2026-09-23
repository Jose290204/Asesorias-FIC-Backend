const joi = require('joi');

// Expresión regular para validar formato de fecha DD/MM/YYYY o DD-MM-YYYY
const regexFecha = /^(0[1-9]|[12][0-9]|3[01])[\/\-](0[1-9]|1[012])[\/\-]\d{4}$/;

// Función reutilizable para validar que la fecha exista de verdad y no sea pasada
function validarFechaReal(value, helpers) {
    const [dia, mes, anio] = value.split('/').map(Number);
    const fecha = new Date(anio, mes - 1, dia);

    // Si JS "corrige" la fecha (ej: 31/02 se vuelve 03/03), significa que no era válida
    const esFechaValida =
        fecha.getFullYear() === anio &&
        fecha.getMonth() === mes - 1 &&
        fecha.getDate() === dia;

    if (!esFechaValida) {
        return helpers.error('fecha.invalida');
    }

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (fecha < hoy) {
        return helpers.error('fecha.pasada');
    }

    return value;
}

const asesoriasCrear = joi.object({
    id_estudiante: joi.number().integer().positive().required().messages({
        'number.base': 'El ID del estudiante debe ser un número',
        'number.integer': 'El ID del estudiante debe ser un número entero',
        'number.positive': 'El ID del estudiante debe ser un valor positivo',
        'any.required': 'El ID del estudiante es obligatorio'
    }),

    id_asesor: joi.number().integer().positive().required().messages({
        'number.base': 'El ID del asesor debe ser un número',
        'number.integer': 'El ID del asesor debe ser un número entero',
        'number.positive': 'El ID del asesor debe ser un valor positivo',
        'any.required': 'El ID del asesor es obligatorio'
    }),

    id_materia: joi.number().integer().positive().required().messages({
        'number.base': 'El ID de la materia debe ser un número',
        'number.integer': 'El ID de la materia debe ser un número entero',
        'number.positive': 'El ID de la materia debe ser un valor positivo',
        'any.required': 'El ID de la materia es obligatorio'
    }),

    id_modalidad: joi.number().integer().positive().required().messages({
        'number.base': 'El ID de la modalidad debe ser un número',
        'number.integer': 'El ID de la modalidad debe ser un número entero',
        'number.positive': 'El ID de la modalidad debe ser un valor positivo',
        'any.required': 'El ID de la modalidad es obligatorio'
    }),

    fecha_inicio: joi.string().trim().pattern(regexFecha).required().custom(validarFechaReal).messages({
        'string.empty': 'La fecha de inicio es obligatoria',
        'string.pattern.base': 'La fecha de inicio debe tener el formato DD/MM/YYYY',
        'any.required': 'La fecha de inicio es un campo obligatorio',
        'fecha.invalida': 'La fecha de inicio no existe en el calendario',
        'fecha.pasada': 'La fecha de inicio no puede ser anterior a hoy'
    }),

    id_razon: joi.number().integer().positive().required().messages({
        'number.base': 'El ID de la razón debe ser un número',
        'number.integer': 'El ID de la razón debe ser un número entero',
        'number.positive': 'El ID de la razón debe ser un valor positivo',
        'any.required': 'El ID de la razón es obligatorio'
    }),

    sesiones_tomadas: joi.number().integer().min(0).max(20).optional().default(0).messages({
        'number.base': 'Las sesiones tomadas deben ser un número',
        'number.integer': 'Las sesiones tomadas deben ser un número entero',
        'number.min': 'Las sesiones tomadas no pueden ser negativas',
        'number.max': 'Las sesiones tomadas no pueden exceder 20'
    }),

    observaciones: joi.string().trim().max(500).allow('', null).optional().messages({
        'string.max': 'Las observaciones no pueden exceder los 500 caracteres'
    }),

    id_horario: joi.number().integer().positive().required().messages({
        'number.base': 'El ID del horario debe ser un número',
        'number.integer': 'El ID del horario debe ser un número entero',
        'number.positive': 'El ID del horario debe ser un valor positivo',
        'any.required': 'El ID del horario es obligatorio'
    })
});

const asesoriasEditar = joi.object({
    id_materia: joi.number().integer().positive().required().messages({
        'number.base': 'El ID de la materia debe ser un número',
        'number.integer': 'El ID de la materia debe ser un número entero',
        'number.positive': 'El ID de la materia debe ser un valor positivo',
        'any.required': 'El ID de la materia es obligatorio'
    }),

    id_modalidad: joi.number().integer().positive().required().messages({
        'number.base': 'El ID de la modalidad debe ser un número',
        'number.integer': 'El ID de la modalidad debe ser un número entero',
        'number.positive': 'El ID de la modalidad debe ser un valor positivo',
        'any.required': 'El ID de la modalidad es obligatorio'
    }),

    fecha_inicio: joi.string().trim().pattern(regexFecha).required().messages({
        'string.empty': 'La fecha de inicio es obligatoria',
        'string.pattern.base': 'La fecha de inicio debe tener el formato DD/MM/YYYY',
        'any.required': 'La fecha de inicio es un campo obligatorio'
    }),

    id_razon: joi.number().integer().positive().required().messages({
        'number.base': 'El ID de la razón debe ser un número',
        'number.integer': 'El ID de la razón debe ser un número entero',
        'number.positive': 'El ID de la razón debe ser un valor positivo',
        'any.required': 'El ID de la razón es obligatorio'
    }),

    id_licenciatura: joi.number().integer().positive().required().messages({
        'number.base': 'El ID de la licenciatura debe ser un número',
        'number.integer': 'El ID de la licenciatura debe ser un número entero',
        'number.positive': 'El ID de la licenciatura debe ser un valor positivo',
        'any.required': 'La licenciatura es un campo obligatorio'
    }),

    sesiones_tomadas: joi.number().integer().min(0).required().messages({
        'number.base': 'Las sesiones tomadas deben ser un número',
        'number.integer': 'Las sesiones tomadas deben ser un número entero',
        'number.min': 'Las sesiones tomadas no pueden ser negativas',
        'any.required': 'Las sesiones tomadas son obligatorias'
    }),

    observaciones: joi.string().trim().max(500).allow('', null).optional().messages({
        'string.max': 'Las observaciones no pueden exceder los 500 caracteres'
    }),

    id_horario: joi.number().integer().positive().required().messages({
        'number.base': 'El ID del horario debe ser un número',
        'number.integer': 'El ID del horario debe ser un número entero',
        'number.positive': 'El ID del horario debe ser un valor positivo',
        'any.required': 'El ID del horario es obligatorio'
    })
});



module.exports = { asesoriasCrear, asesoriasEditar };