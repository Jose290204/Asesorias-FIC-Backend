const db = require("../../config/dbConfig")
const catalogosRepository = require('./catalogos.repository')

async function getCatalogos() {
    try {
        const datosCatalogos = await catalogosRepository.obtenerCatalogos();

        return datosCatalogos;
    } catch (error) {
        console.error('error al traer catalogos', error)
        throw error;
    }
}

module.exports = {getCatalogos}