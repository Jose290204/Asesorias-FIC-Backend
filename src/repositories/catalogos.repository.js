const db = require("../config/dbConfig")

async function obtenerCatalogos() {
    let catalogos = { //objeto que trae todos los catalogos
        dias_semana: [],
        estatus: [],
        estatus_asesoria: [],
        estatus_solicitud: [],
        grupos: [],
        horarios: [],
        licenciaturas: [],
        materias: [],
        modalidades: [],
        plan_estudios: [],
        razon_asesoria: [],
        roles: [],
        semestres: []
    }

    try {
        // se traen los catalogos

        const [dias, est, esta, ests, gru, hor, lic, mat, mod, plan, razon, rol, sem] = await Promise.all([
            db.dias_semana.findMany(),
            db.estatus.findMany(),
            db.estatus_asesorias.findMany(),
            db.estatus_solicitud.findMany(),
            db.grupos.findMany(),
            db.horarios.findMany(),
            db.licenciaturas.findMany(),
            db.materias.findMany(),
            db.modalidades.findMany(),
            db.plan_estudios.findMany(),
            db.razon_asesoria.findMany(),
            db.roles.findMany(),
            db.semestres.findMany()
        ])


        catalogos.dias_semana = dias
        catalogos.estatus = est
        catalogos.estatus_asesoria = esta
        catalogos.estatus_solicitud = ests
        catalogos.grupos = gru
        catalogos.horarios = hor
        catalogos.licenciaturas = lic
        catalogos.materias = mat
        catalogos.modalidades = mod
        catalogos.plan_estudios = plan
        catalogos.roles = rol
        catalogos.semestres = sem

    return catalogos;
    } catch (error) {
        console.error("error al traer catalogos", error);
        throw error;
    }

    

}

module.exports = {obtenerCatalogos}