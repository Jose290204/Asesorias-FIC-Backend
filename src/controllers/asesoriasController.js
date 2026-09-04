const AsesoriasService = require('../services/asesorias.service');
const { asesoriaSchema } = require('../validators/asesorias.validator');



async function crearAsesoria(req, res) {
   // validar los datos que vienen con el validator
   const {error, value} = asesoriaSchema.validate(req.body);

   if(error){//si vienen mal los datos, se manda el error
    return res.status(400).json({
        success: false,
        message: "Datos de entrada invalidos",
        detalles: error.details[0].message
    });
   }

   try {
    // si pasa la validacion, enviamos los datos en el value al servicio
    const nuevaAsesoria = await AsesoriasService.crearAsesoria(value);

    if(!nuevaAsesoria){ // si hay error en la solicitud, se manda el error
        return res.status(500).json({
            success: false,
            message: "hubo un error, intente nuevamente"
        })
    }

    return res.status(201).json({ //si todo se inserto correctamente, se regresa el 201 
        success: true,
        message: "Asesoria registrada correctamente",
        data: nuevaAsesoria
    })
   } catch (error) {
    console.error("Error creando asesoria", error);
    return res.status(500).json({
        success: false,
        error: error.message
    });
   }
   
}


/*
async function traerSolicitudes(req, res) {
    try {
        const solicitudes = await solicitudesService.traerSolicitudes();

        return res.status(200).json(solicitudes);
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}
*/


module.exports = { crearAsesoria};