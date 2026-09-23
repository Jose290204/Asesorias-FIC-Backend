const db = require("../../config/dbConfig")

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

    function obtenerNombreLicenciatura(id_licenciatura) {
    switch (id_licenciatura) {
        case 1:
            return 'Informática';
        case 2:
            return 'Informática Virtual';
        case 3:
            return 'Ciencia de Datos';
        case 4:
            return 'ITSE'
        default:
            return '';
    }
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
            db.materias.findMany({ where: {id_plan: 2}}),
            db.modalidades.findMany(),
            db.plan_estudios.findMany(),
            db.razon_asesoria.findMany(),
            db.roles.findMany(),
            db.semestres.findMany()
        ])

        // hacemos el mapeo: le concatenamos el nombre de la licenciatura al nombre de la materia
        const materiasConLicenciatura = mat.map((materia) => ({
            ...materia,
            materia: `${materia.materia} - ${obtenerNombreLicenciatura(materia.id_licenciatura)}`
        }));

        // hacemos el mapeo: le concatenamos el nombre de la licenciatura al grupo
        const gruposConLicenciatura = gru.map((grupo) => ({
            ...grupo,
            grupo: `${grupo.grupo} - ${obtenerNombreLicenciatura(grupo.id_licenciatura)}`
        }));



        catalogos.dias_semana = dias
        catalogos.estatus = est
        catalogos.estatus_asesoria = esta
        catalogos.estatus_solicitud = ests
        catalogos.grupos = gruposConLicenciatura
        catalogos.horarios = hor
        catalogos.licenciaturas = lic
        catalogos.materias = materiasConLicenciatura
        catalogos.modalidades = mod
        catalogos.plan_estudios = plan
        catalogos.razon_asesoria = razon
        catalogos.roles = rol
        catalogos.semestres = sem

    return catalogos;
    } catch (error) {
        console.error("error al traer catalogos", error);
        throw error;
    }

    

}

module.exports = {obtenerCatalogos}