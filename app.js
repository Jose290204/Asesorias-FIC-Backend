const express = require('express');
const createError = require('http-errors');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//ROUTERS
const asesoresParRouter = require('./router/administrador/asesoresParRoutes');
const estudiantesRouter = require('./router/administrador/estudiantesRouters');
const catalogosRouter = require('./router/administrador/catalogosRoutes');
const asesoresDisciRouter = require('./router/administrador/asesoresDisciplinarRoutes');
const usuariosRouter = require('./router/administrador/usuariosRoutes')
const solicitudesRouter = require('./router/administrador/solicitudesRoutes')
const asesoriasRouter = require('./router/administrador/asesoriasRoutes')
const solicitarRouter = require('./router/estudiante/solicitarAsesorias')

const app = express();

// Configuración del motor de vistas (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configuración de CORS
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    // credentials: true, // Si necesitas enviar cookies o encabezados personalizados
}));

// Middleware de log, body parser y cookie parser
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));


// Rutas de los controladores
app.use('/asesores-par', asesoresParRouter);
app.use('/estudiantes', estudiantesRouter);
app.use('/catalogos', catalogosRouter);
app.use('/asesores-disciplinar', asesoresDisciRouter);
app.use('/usuarios', usuariosRouter);
app.use('/solicitudes', solicitudesRouter);
app.use('/asesorias', asesoriasRouter);
app.use('/solicitar', solicitarRouter);


// Manejo de errores 404 (no encontrado)
app.use(function (req, res, next) {
    next(createError(404));
});

// Manejador de errores generales
app.use(function (err, req, res, next) {
    console.log('Error:', err); // Añade esto para ver el error completo en consola
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
