import express from 'express';
import path from 'path';
import session from 'express-session';


const app = express();

// Configuración de express-session
app.use(session({
    secret: 'SKNnNNki',  // Cambia esto por una clave secreta
    resave: false,               // No volver a guardar la sesión si no ha cambiado
    saveUninitialized: true,     // Guardar una sesión nueva si no tiene valores
    cookie: { secure: false }    // Si usas HTTPS, cambia 'false' por 'true'
}));

app.use(express.urlencoded({ extended: true })); //esto es para que el servidor entienda los formatos de los formularios
app.use(express.json());//esto es para que el servidor entienda los formatos json


// configuracion del puerto
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

//esto es para que el servidor pueda servir archivos estaticos
app.use(express.static(path.join(process.cwd(), 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));


// estas son las rutas de la aplicacion para ejecutar las paginas 
app.get('/', (req, res) => { res.render('index'); });

import inicioRouter from './routes/inicioRouter.js'
app.get('/inicio', inicioRouter);


import indexRouter from './routes/indexRouter.js'
app.post('/crearCuenta', indexRouter);
app.post('/login', indexRouter);


import registrarCitasRouter from './routes/registrarCitasRouter.js'
import informacionCitasRouter from './routes/informacionCitasRouter.js'
app.get('/registrarCitas', registrarCitasRouter);
app.get('/informacionCitas', informacionCitasRouter);
app.post('/buscarPacienteCitas', registrarCitasRouter)
app.post('/registrarNuevaCita', registrarCitasRouter);


import registrarConsultaGeneralRouter from './routes/registrarConsultaGeneralRouter.js';
import registarConsultaVacunacionRouter from './routes/registrarConsultaVacunacionRouter.js'
import informacionConsultasRouter from './routes/informacionConsultasRouter.js'

app.get('/registrarConsultaGeneral', registrarConsultaGeneralRouter);
app.post('/buscarPacienteConsultas', registrarConsultaGeneralRouter);
app.post('/registrarConsultaGeneral', registrarConsultaGeneralRouter);

app.get('/registrarConsultaVacunacion', registarConsultaVacunacionRouter);
app.post('/nuevaConsultaVacunacion', registarConsultaVacunacionRouter);
app.post('/buscarPacienteVacunacion', registarConsultaVacunacionRouter);

app.get('/informacionConsultas', informacionConsultasRouter);
app.post('/filtroConsultas', informacionConsultasRouter);






import registrarPacientesRouter from './routes/registrarPacientesRouter.js'
app.get('/registrarPacientes', (req,res) => { res.render('registrarPacientes'); });
//reouter registraPacientes
app.post('/registrarPropietario', registrarPacientesRouter); 
app.post('/registrarMascota', registrarPacientesRouter); 



import informacionPacientesRouter from './routes/informacionPacientesRouter.js'
app.get('/informacionPacientes', informacionPacientesRouter)
app.post('/buscarPacienteInformacion', informacionPacientesRouter)
app.post('/datosMascota', informacionPacientesRouter)



app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if(err){
            console.log("error en la destruccion de la sesion", err)
            return res.redirect('/');
        }
        res.redirect('/')
    })
})

