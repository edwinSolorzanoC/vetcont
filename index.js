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

app.get('/inicio', (req,res) => { res.render('inicio'); });


import indexRouter from './routes/indexRouter.js'
app.post('/crearCuenta', indexRouter);
app.post('/login', indexRouter);


app.get('/registrarCitas', (req,res) => { res.render('registrarCitas'); });
app.get('/informacionCitas', (req,res) => { res.render('informacionCitas'); });


app.get('/registrarConsultaGeneral', (req,res) => { res.render('registrarConsultaGeneral'); });
app.get('/registrarConsultaVacunacion', (req,res) => { res.render('registrarConsultaVacunacion'); });
app.get('/informacionConsultas', (req,res) => { res.render('informacionConsultas'); });


import registrarPacientesRouter from './routes/registrarPacientesRouter.js'
app.get('/registrarPacientes', (req,res) => { res.render('registrarPacientes'); });
//reouter registraPacientes
app.post('/registrarPropietario', registrarPacientesRouter); 
app.post('/registrarMascota', registrarPacientesRouter); 



import informacionPacientesRouter from './routes/informacionPacientesRouter.js'
app.get('/informacionPacientes', informacionPacientesRouter)
app.post('/buscarPaciente', informacionPacientesRouter)


app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if(err){
            console.log("error en la destruccion de la sesion", err)
            return res.redirect('/');
        }
        res.redirect('/')
    })
})

