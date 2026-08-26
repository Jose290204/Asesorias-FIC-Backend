const solicitudesService = require('../services/solicitudes.service');
const { solicitudesSchema } = require('../validators/solicitudes.validator');



async function crearSolicitud(req, res) {
   // validar los datos que vienen con el validator
   const {error, value} = solicitudesSchema.validate(req.body);

   if(error){
    return res.status(400).json({
        success: false,
        message: "Datos de entrada invalidos",
        detalles: error.details[0].message
    });
   }

   try {
    // si pasa la validacion, enviamos los datos en el value al servicio
    const nuevaSolicitud = await solicitudesService.crearSolicitudAsesoria(value);

    if(!nuevaSolicitud){
        return res.status(500).json({
            success: false,
            message: "hubo un error, intente nuevamente"
        })
    }

    return res.status(201).json({
        success: true,
        message: "Solicitud registrada correctamente",
        data: nuevaSolicitud
    })
   } catch (error) {
    console.error("Error en crearsolicitud controller", error);
    return res.status(500).json({
        success: false,
        error: error.message
    });
   }
   
}

module.exports = { crearSolicitud};