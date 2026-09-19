const solicitudesService = require('./solicitudes.service');
const { solicitudesSchema } = require('./solicitudes.validator');



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

async function aceptarSolicitud(req, res){
    try {
        const { id } = req.params //recibimos el id de la solicitud

        const id_solicitud = Number(id);

        if(!id_solicitud){ //validamos si el id_asesoria viene bien
            return res.status(400).json({
                success: false,
                message: "EL ID de la solicitud es requerido"
            })
        } 
        else if(!Number.isInteger(id_solicitud) || id_solicitud <= 0){
            return res.status(400).json({
                success: false,
                message: "EL ID de la solicitud debe ser un numero entero positivo"
            })
        }

        //llamamos el service
        await solicitudesService.aceptarSolicitud(id_solicitud);

        return res.status(200).json({
            success: true,
            message: "La solicitud fue aceptada exitosamente"
        })
    } catch (error) {
         console.error(error);

        const StatusCode = error.status || 500

        return res.status(StatusCode).json({
            success: false,
            message: error.message
        })
    }
}

async function rechazarSolicitud(req, res){
    try {
        const { id } = req.params //recibimos el id de la solicitud

        const id_solicitud = Number(id);

        if(!id_solicitud){ //validamos si el id_asesoria viene bien
            return res.status(400).json({
                success: false,
                message: "EL ID de la solicitud es requerido"
            })
        } 
        else if(!Number.isInteger(id_solicitud) || id_solicitud <= 0){
            return res.status(400).json({
                success: false,
                message: "EL ID de la solicitud debe ser un numero entero positivo"
            })
        }

        //llamamos el service
        await solicitudesService.rechazarSolicitud(id_solicitud);

        return res.status(200).json({
            success: true,
            message: "La solicitud fue rechazada exitosamente"
        })
    } catch (error) {
         console.error(error);

        const StatusCode = error.status || 500

        return res.status(StatusCode).json({
            success: false,
            message: error.message
        })
    }
}



module.exports = { crearSolicitud, traerSolicitudes, aceptarSolicitud, rechazarSolicitud};