export const checkRole = (...rolesPermitidos) => {
    return (req, res, next) => {
        if(!req.user){
            return res.status(401).json({message: 'no autenticado'})
        }

        const { id_rol } = req.user;

        if(!rolesPermitidos.includes(id_rol)){
            return res.status(403).json({message: 'no tiene los permisos necesarios para esta accion'})
        }
        
        next();
    }
}