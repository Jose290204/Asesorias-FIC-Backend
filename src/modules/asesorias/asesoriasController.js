const AsesoriasService = require('./asesorias.service');
const { asesoriaCrear, asesoriasEditar } = require('./asesorias.validator');



async function crearAsesoria(req, res) {
   // validar los datos que vienen con el validator
   const {error, value} = asesoriaCrear.validate(req.body);

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

async function getAsesoriasEnCurso(req, res) {
    try {
        const asesorias = await AsesoriasService.getAsesoriasActivas();

        return res.status(200).json({
            success: true,
            data: asesorias
        });

    } catch (error) {
        console.error("Error en asesorias controller, getAsesoriasEnCurso", error);

        return res.status(500).json({
            success: false,
            message: "Error al obtener las asesorias activas"
        });
    }
}

async function completarAsesoria(req, res) {
    try {
        const { id } = req.params; // recibimos el id asesoria

        const id_asesoria = Number(id);

        if(!id_asesoria){ //validamos si el id_asesoria viene bien
            return res.status(400).json({
                success: false,
                message: "EL ID de la asesoria es requerido"
            })
        } 
        else if(!Number.isInteger(id_asesoria) || id_asesoria <= 0){
            return res.status(400).json({
                success: false,
                message: "EL ID de la asesoria debe ser un numero entero positivo"
            })
        }

        //llamamos al service
        await AsesoriasService.finalizarAsesoria(id_asesoria);

        return res.status(200).json({
            success: true,
            message: "Asesoria completada correctamente"
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

async function eliminarAsesoria(req, res) {
    try {
        const { id } = req.params; // recibimos el id asesoria

        const id_asesoria = Number(id);

        if(!id_asesoria){ //validamos si el id_asesoria viene bien
            return res.status(400).json({
                success: false,
                message: "EL ID de la asesoria es requerido"
            })
        } 
        else if(!Number.isInteger(id_asesoria) || id_asesoria <= 0){
            return res.status(400).json({
                success: false,
                message: "EL ID de la asesoria debe ser un numero entero positivo"
            })
        }

        //llamamos al service
        await AsesoriasService.eliminarAsesoria(id_asesoria);

        return res.status(200).json({
            success: true,
            message: "Asesoria eliminado correctamente"
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

async function editarAsesoria(req, res) {

    try {
          const { id } = req.params; // tomamos el id de los params
          const datosActualizar = req.body; // tomamos el body

        const {error, value} = asesoriasEditar.validate(datosActualizar);

        if(error){//si vienen mal los datos, se manda el error
            return res.status(400).json({
                success: false,
                message: "Datos de entrada invalidos",
                detalles: error.details[0].message
            });
        }

            // si pasa la validacion, enviamos los datos en el value al servicio
        await AsesoriasService.editarAsesoria(id, value);

        return res.status(201).json({ //si todo se inserto correctamente, se regresa el 201 
            success: true,
            message: "Asesoria editada correctamente",
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


module.exports = { crearAsesoria, getAsesoriasEnCurso, completarAsesoria, eliminarAsesoria, editarAsesoria};