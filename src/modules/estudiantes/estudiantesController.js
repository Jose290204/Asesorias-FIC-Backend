const estudiantesService = require("./estudiantes.service")
const { estudianteSchema } = require("./estudiante.validator")

async function getEstudiantes(req, res){
    try {
        const data = await estudiantesService.getEstudiantes();
        res.json(data);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

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

module.exports = { getEstudiantes, crearEstudiante};