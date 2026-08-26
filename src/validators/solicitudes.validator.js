const joi = require('joi');

const solicitudesSchema = joi.object({
  id_materia: joi.number().integer().positive().required().messages({
    'number.base': 'El id de la materia debe ser un número',
    'any.required': 'La materia es requerida',
  }),

  id_horario: joi.number().integer().positive().required().messages({
    'number.base': 'El id del horario debe ser un número',
    'any.required': 'El horario es requerido',
  }),

  id_modalidad: joi.number().integer().positive().required().messages({
    'number.base': 'El id de la modalidad debe ser un número',
    'any.required': 'La modalidad es requerida',
  }),

  id_estudiante: joi.number().integer().positive().required().messages({
    'number.base': 'El id del estudiante debe ser un número',
    'any.required': 'El estudiante es requerido',
  }),

  id_asesor: joi.number().integer().positive().required().messages({
    'number.base': 'El id del asesor debe ser un número',
    'any.required': 'El asesor es requerido',
  }),

  fecha_inicio: joi.string().required().messages({
    'string.empty': 'La fecha de inicio no puede estar vacía',
    'any.required': 'La fecha de inicio es requerida',
  }),

  id_razon: joi.number().integer().positive().allow(null).optional().messages({
    'number.base': 'El id de la razón debe ser un número',
  }),

  nota_estudiante: joi.string().trim().allow('', null).optional().messages({
    'string.base': 'La nota del estudiante debe ser un texto',
  }),

  explicacion_asesor: joi.string().trim().allow('', null).optional().messages({
    'string.base': 'La explicación del asesor debe ser un texto',
  }),

  id_estatus: joi.number().integer().positive().optional().messages({
    'number.base': 'El id del estatus debe ser un número',
  }),
});

module.exports = { solicitudesSchema };