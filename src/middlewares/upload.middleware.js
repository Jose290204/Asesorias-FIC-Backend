const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento temporal
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // carpeta temporal donde se guarda el archivo antes de procesarlo
    },
    filename: (req, file, cb) => {
        const nombreUnico = `${Date.now()}-${file.originalname}`;
        cb(null, nombreUnico);
    },
});

// Filtro: solo aceptar archivos Excel
const filtroExcel = (req, file, cb) => {
    const extensionesValidas = ['.xlsx', '.xls'];
    const extension = path.extname(file.originalname).toLowerCase();

    if (extensionesValidas.includes(extension)) {
        cb(null, true);
    } else {
        cb(new Error('Solo se permiten archivos Excel (.xlsx, .xls)'), false);
    }
};

const upload = multer({
    storage,
    fileFilter: filtroExcel,
    limits: {
        fileSize: 5 * 1024 * 1024, // límite de 5 MB
    },
});

module.exports = upload;