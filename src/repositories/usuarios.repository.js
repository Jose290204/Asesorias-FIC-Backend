const db = require("../config/dbConfig")



async function crearUsuario(datos, connection = db){
    try {
        const nuevoUsuario = await connection.usuarios.create({
            data: datos
        });
        return nuevoUsuario;
    } catch (error) {
        console.error("error en el repository usuarios:", error)
        throw error;
    }
}







module.exports = {crearUsuario}