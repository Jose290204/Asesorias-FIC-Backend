const asesoresService = require("./asesores.service")
const { estudianteSchema } = require("../estudiantes/estudiante.validator")

async function getAsesores(req, res){
    try {
        const data = await asesoresService.traerAsesores();
        res.json(data);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

async function getPerfilAsesor(req, res) {
    try {
        const id_asesor = req.usuario.id_usuario; // del token, así cada asesor ve solo su propio perfil

        const perfil = await asesoresService.getPerfilAsesor(id_asesor);//llamamos el service

        return res.status(200).json({
            success: true,
            data: perfil
        });

    } catch (error) {
        console.error(error);
        const statusCode = error.status || 500;
        return res.status(statusCode).json({
            success: false,
            message: "Error al obtener el perfil del asesor"
        });
    }
}

async function actualizarMateriasYHorarios(req, res) {
    try {
        const id_asesor = req.usuario.id_usuario;
        const { Materias, Horarios } = req.body;

        // si esto truena, saltamos directo al catch
        await asesoresService.actualizarMateriasYHorarios(id_asesor, Materias, Horarios);

        // todo salio bien y se manda la respuesta 
        return res.status(200).json({
            success: true,
            message: "Materias y horarios actualizados correctamente"
        });

    } catch (error) {
        console.error(error); // el detalle técnico completo, solo para ti en la terminal

        const statusCode = error.status || 500;

        return res.status(statusCode).json({
            success: false,
            message: "No se pudo actualizar los datos, intente nuevamente"
        });
    }
}

/*
async function crearEstudiante(req, res) {
   
        //mandamos los datos recibidos a nuestro schema para validarlo
        const {error, value} = estudianteSchema.validate(req.body);
        
        //si hay error
        if(error){
            return res.status(400).json({
                success: false,
                message: "Datos de entrada invalidos",
                detalles: error.details[0].message
            })
        }

        try {
            // si paso la validacion, 'value' ya trae todos los datos limpios
            const datos = await estudiantesService.crearEstudiante(value)
            res.status(201).json(resultado);
        } catch (error) {
            res.status(500).json({error: error.message});
        }

      
   
}
        */

module.exports = { getAsesores, getPerfilAsesor, actualizarMateriasYHorarios};