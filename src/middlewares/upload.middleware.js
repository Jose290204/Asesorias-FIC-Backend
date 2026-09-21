const multer = require('multer');

// Almacenamiento en memoria para enviar directamente a Google Drive
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024, // Limite de 10MB por archivo
    },
});

module.exports = upload;