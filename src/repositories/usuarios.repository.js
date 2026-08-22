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

async function buscarUsuarioLogin(usuario){
    try {
        const datosUsuario = await db.usuarios.findUnique({
            where: {
                usuario: usuario //busqueda del usuario para ver si existe oara devolver datos y hacer la comparacion de las passwords
            },
            include: {
                datos_persona: true
            }
        })
        return datosUsuario;
    } catch (error) {
        console.error("Error buscando usuario", error);
        throw error
    }
}









module.exports = {crearUsuario, buscarUsuarioLogin}