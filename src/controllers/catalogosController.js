const catalogosService = require("../services/catalogos.service");


const traerCatalogos = async(req, res) => {

    try {
        //ejecuto la llamada de traer los catalogos
        const catalogos = await catalogosService.getCatalogos()

        return res.status(200).json(catalogos);

        
    } catch (error) {
        console.error("error en catalogos", error);
        return res.status(500).json({message: "hubo un error interno en un servidor"})
    }
    

}

module.exports = {traerCatalogos}