const { google } = require('googleapis');
const { Readable } = require('stream');

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'https://developers.google.com/oauthplayground'
);

oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const drive = google.drive({ version: 'v3', auth: oauth2Client });

const subirArchivoADrive = async (file) => {
    try {
        console.log("Subiendo archivo a la carpeta destino:", process.env.GOOGLE_DRIVE_FOLDER_ID);

        const driveResponse = await drive.files.create({
            requestBody: {
                name: file.originalname,
                parents: [process.env.GOOGLE_DRIVE_FOLDER_ID],
            },
            media: {
                mimeType: file.mimetype,
                body: Readable.from(file.buffer),
            },
            fields: 'id, webViewLink',
            supportsAllDrives: true,
        });

        // Configura el archivo para que sea accesible públicamente por enlace
        await drive.permissions.create({
            fileId: driveResponse.data.id,
            requestBody: { 
                role: 'reader', 
                type: 'anyone' 
            },
            supportsAllDrives: true,
        });

        return {
            drive_file_id: driveResponse.data.id,
            url_archivo: driveResponse.data.webViewLink,
        };
    } catch (error) {
        console.error('Error al subir el archivo a Google Drive:', error);
        throw error;
    }
};

const eliminarArchivoDeDrive = async (driveFileId) => {
    try {
        await drive.files.delete({ 
            fileId: driveFileId,
            supportsAllDrives: true,
        });
    } catch (error) {
        console.error('Error al eliminar en Drive:', error.message);
    }
};

module.exports = { subirArchivoADrive, eliminarArchivoDeDrive };